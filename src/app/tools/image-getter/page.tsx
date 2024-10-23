"use client";

import { Box, Button, Divider, LinearProgress, Stack, Tooltip, Typography } from "@mui/joy";
import { Breadcrumb, FindImageLinksModal, Header, MARGIN_HEADER, Main, Main_Container, chooseThemeValueIn, color, isBase64Image } from "@/components";
import { Close, ContentCopy, CopyAll, Delete, Download, ErrorOutline, HighlightAlt, OpenInNew, Refresh } from "@mui/icons-material";
import { ToolEn, ToolVi } from "@/locales";
import { useEffect, useRef, useState } from "react";

import { Fragment } from "react";
import { Grid } from "@mui/material";
import JSZip from "jszip";
import { useGlobalContext } from "@/context/store";

interface URLErrorImage {
    url: string;
    index: number;
    errorType: string;
}

const BreadcrumbParentTag = [
    {
        text: {
            vi: "Công cụ & Dịch vụ",
            en: "Tools & Services",
        },
        url: "tools",
    },
];

// LinearProgressWithLabel function
function LinearProgressWithLabel({ text, progress }: { text: string; progress: number }) {
    return (
        <Box sx={{ bgcolor: "white", width: "100%" }}>
            <LinearProgress
                determinate
                variant="outlined"
                color="neutral"
                size="sm"
                thickness={32}
                value={progress}
                sx={{
                    "--LinearProgress-radius": "0px",
                    "--LinearProgress-progressThickness": "24px",
                    boxShadow: "sm",
                    borderColor: "neutral.500",
                }}
            >
                <Typography level="body-xs" textColor="common.white" sx={{ fontWeight: "xl", mixBlendMode: "difference" }}>
                    {text} {`${Math.round(progress)}%`}
                </Typography>
            </LinearProgress>
        </Box>
    );
}

export default function Page() {
    const { lang, systemMode, isMobile } = useGlobalContext();
    const T = lang === "en" ? ToolEn.imageGetter : ToolVi.imageGetter;

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);

    const [delayTimeout, setDelayTimeout] = useState<number>(5);
    const [imageURLs, setImageURLs] = useState<string>("");
    const [reloadImageURLs, setReloadImageURLs] = useState<boolean>(false);
    const [folderName, setFolderName] = useState<string>("");
    const [alert, setAlert] = useState<string | null>(null);
    const [loadingValidImages, setLoadingValidImages] = useState<boolean>(false);
    const [validImages, setValidImages] = useState<{ row: number; url: string }[]>([]);
    const [excludedImages, setExcludedImages] = useState<Set<string>>(new Set());
    const [progress, setProgress] = useState<number>(0); // State to track progress
    const [errorImages, setErrorImages] = useState<URLErrorImage[]>([]); // Danh sách URL lỗi
    const [showTooltipShowError, setShowTooltipShowError] = useState<boolean>(false);
    const [blobUrls, setBlobUrls] = useState<Record<string, string | null>>({});
    const [isDownAllLoading, setIsDownAllLoading] = useState<boolean>(false); // Loading state for the button

    const [duplicates, setDuplicates] = useState<Record<string, number[]>>({}); // Store duplicate groups
    const [isHandleDuplicateLoading, setIsHandleDuplicateLoading] = useState<boolean>(false); // Loading state for the button
    const [progressHandleImage, setProgressHandleImage] = useState<number>(0); // State to track progress

    const [statusCopyToClipboard, setStatusCopyToClipboard] = useState<{
        url: string;
        row: number;
        message: {
            vi: string;
            en: string;
        };
    }>({
        url: "",
        row: 0,
        message: {
            vi: "",
            en: "",
        },
    });

    const handleToggleTooltipShowError = () => {
        setShowTooltipShowError(!showTooltipShowError);
    };

    // Hàm để kiểm tra nếu click bên ngoài phần tử có Tooltip
    const handleClickOutside = (event: MouseEvent) => {
        if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
            setShowTooltipShowError(false);
        }
    };

    useEffect(() => {
        // Thêm sự kiện lắng nghe khi component mount
        document.addEventListener("mousedown", handleClickOutside);

        // Loại bỏ sự kiện lắng nghe khi component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Khi người dùng nhấn vào một URL lỗi
    const handleHighlightErrorUrl = (url: string, urlIndex: number) => {
        const textarea = textareaRef.current;
        const row = urlIndex - 1;

        if (textarea) {
            window.scrollTo(0, textarea.getBoundingClientRect().top + window.pageYOffset - (MARGIN_HEADER + 90));
            const lines = textarea.value.split("\n");
            let atIndex = 0;

            if (row) {
                for (let i = 0; i < row; i++) {
                    atIndex += lines[i].length;
                }
            }

            const startIndex = atIndex + row;
            const endIndex = startIndex + lines[row].length;
            textarea.focus();
            textarea.setSelectionRange(startIndex, endIndex); // Highlight URL

            // Tự động scroll đến vị trí URL được highlight
            const lineHeight = 20; // Giả định chiều cao mỗi dòng là 20px (bạn có thể điều chỉnh nếu cần)
            const scrollPosition = urlIndex * lineHeight - textarea.clientHeight / 2; // Căn giữa URL được highlight

            textarea.scrollTop = scrollPosition;
        }
    };

    // Sao chép URL vào clipboard
    const handleCopyToClipboard = (url: string, row: number) => {
        navigator.clipboard.writeText(url).catch((err) => {
            console.error("Failed to copy: ", err);
        });

        const msg = {
            en: `You just copied the URL [${row}]!`,
            vi: `Bạn vừa sao chép URL [${row}]!`,
        };

        if (row === -1) {
            msg.en = "You just copied all the URLs below!";
            msg.vi = "Bạn vừa sao chép tất cả URL bên dưới!";
        }

        setStatusCopyToClipboard({ url: url, row: row, message: msg });
    };

    useEffect(() => {
        const findDuplicates = async () => {
            const imageGroups: Record<string, number[]> = {};

            for (let i = 0; i < validImages.length; i++) {
                const imageUrl = validImages[i].url;
                const fileName = imageUrl.split("/").pop()?.split("?")[0]; // Lấy tên file từ URL

                if (fileName) {
                    if (!imageGroups[fileName]) {
                        imageGroups[fileName] = [];
                    }
                    imageGroups[fileName].push(i + 1); // Lưu lại số thứ tự của ảnh
                }
            }

            // Chỉ giữ lại các nhóm có hơn 1 ảnh (các ảnh trùng nhau)
            const duplicates = Object.fromEntries(Object.entries(imageGroups).filter(([_, indexes]) => indexes.length > 1));

            setDuplicates(duplicates); // Lưu lại các ảnh trùng
        };

        findDuplicates();
    }, [validImages]);

    // const handleRemoveAllLowerQuality = async () => {
    //     setIsHandleDuplicateLoading(true); // Hiển thị loading
    //     setProgressHandleImage(0); // Đặt tiến độ bắt đầu từ 0%

    //     // Hàm để so sánh ảnh pixel theo pixel
    //     const areImagesIdentical = async (url1: string, url2: string): Promise<boolean> => {
    //         const img1 = await loadImage(url1);
    //         const img2 = await loadImage(url2);

    //         if (img1.width !== img2.width || img1.height !== img2.height) return false;

    //         const canvas1 = document.createElement("canvas");
    //         const canvas2 = document.createElement("canvas");
    //         const ctx1 = canvas1.getContext("2d");
    //         const ctx2 = canvas2.getContext("2d");

    //         canvas1.width = img1.width;
    //         canvas1.height = img1.height;
    //         canvas2.width = img2.width;
    //         canvas2.height = img2.height;

    //         ctx1?.drawImage(img1, 0, 0);
    //         ctx2?.drawImage(img2, 0, 0);

    //         const data1 = ctx1?.getImageData(0, 0, img1.width, img1.height).data;
    //         const data2 = ctx2?.getImageData(0, 0, img2.width, img2.height).data;

    //         // So sánh pixel theo pixel
    //         if (data1 && data2) {
    //             for (let i = 0; i < data1.length; i++) {
    //                 if (data1[i] !== data2[i]) {
    //                     return false;
    //                 }
    //             }
    //             return true;
    //         }
    //         return false;
    //     };

    //     let updatedValidImages = [...validImages];
    //     const processedGroups = new Set();

    //     // Xử lý từng nhóm ảnh trùng lặp
    //     const totalGroups = Object.keys(duplicates).length;
    //     let processedGroupsCount = 0;

    //     for (const [fileName, indexes] of Object.entries(duplicates)) {
    //         if (processedGroups.has(fileName)) continue;

    //         // Lấy tất cả các URL ảnh trùng lặp
    //         const duplicateUrls = indexes.map((index) => validImages[index - 1]);

    //         if (duplicateUrls.length > 1) {
    //             const resolutions = await Promise.all(duplicateUrls.map((url) => getImageResolution(url)));

    //             // Tìm ảnh có độ phân giải cao nhất
    //             const highestQualityIndex = resolutions.reduce((maxIdx, current, idx, arr) => {
    //                 return current.width * current.height > arr[maxIdx].width * arr[maxIdx].height ? idx : maxIdx;
    //             }, 0);

    //             const highestQualityUrl = duplicateUrls[highestQualityIndex];

    //             // Đánh dấu các ảnh cần loại bỏ
    //             const duplicatesToRemove = new Set<string>();

    //             // Xử lý các ảnh có chất lượng giống nhau
    //             for (let i = 0; i < duplicateUrls.length; i++) {
    //                 for (let j = i + 1; j < duplicateUrls.length; j++) {
    //                     if (await areImagesIdentical(duplicateUrls[i], duplicateUrls[j])) {
    //                         duplicatesToRemove.add(duplicateUrls[j]);
    //                     }
    //                 }
    //             }

    //             // Loại bỏ tất cả các ảnh trùng lặp có chất lượng thấp hơn hoặc trùng tên
    //             updatedValidImages = updatedValidImages.filter((url) => url === highestQualityUrl || !duplicatesToRemove.has(url));
    //             processedGroups.add(fileName);
    //         }

    //         processedGroupsCount++;
    //         setProgressHandleImage(Math.round((processedGroupsCount / totalGroups) * 100));
    //     }

    //     // Loại bỏ ảnh có chất lượng giống nhau hoặc trùng tên
    //     const uniqueValidImages = Array.from(new Set(updatedValidImages));

    //     setValidImages(uniqueValidImages);
    //     setIsHandleDuplicateLoading(false);
    //     setProgressHandleImage(100);
    // };
    const handleRemoveAllLowerQuality = async () => {
        console.log(duplicates);
    };

    // Hàm để load ảnh từ URL
    const loadImage = (url: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous"; // Đảm bảo có thể lấy dữ liệu pixel từ ảnh
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    };

    // Kiểm tra tính hợp lệ của URL ảnh
    const checkImageValidity = (url: string, timeout = 5000): Promise<{ isValid: boolean; errorType?: string }> => {
        return new Promise((resolve) => {
            const img = new Image();
            const timer = setTimeout(() => {
                img.src = "";
                resolve({ isValid: false, errorType: "Timeout" });
            }, timeout);

            img.onload = () => {
                clearTimeout(timer);
                resolve({ isValid: true });
            };
            img.onerror = (e) => {
                clearTimeout(timer);
                const error = e as ErrorEvent;
                resolve({ isValid: false, errorType: error.message || "Unknown or 404" });
            };
            img.src = url;
        });
    };

    const checkValidImages = async () => {
        const urls = imageURLs
            .split("\n")
            .map((url) => url.trim())
            .filter((url) => url !== "");

        const validImageList: { row: number; url: string }[] = [];
        const errImageList: URLErrorImage[] = [];

        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            const { isValid, errorType } = await checkImageValidity(url, delayTimeout * 1000);

            if (isValid) {
                validImageList.push({ row: i + 1, url: url });
            } else {
                errImageList.push({ url, index: i + 1, errorType: errorType || "Lỗi tải ảnh" });
            }

            setProgress(((i + 1) / urls.length) * 100);
        }

        setValidImages(validImageList);
        setErrorImages(errImageList);
        setLoadingValidImages(false);
        setReloadImageURLs(false);
    };

    const handleClearWithoutURLs = () => {
        setFolderName("");
        setValidImages([]);
        setErrorImages([]);
        setExcludedImages(new Set());
        setBlobUrls({});
        setAlert(null);
        setProgress(0);
        setLoadingValidImages(false);
        setIsDownAllLoading(false);
        setDuplicates({});
        setIsHandleDuplicateLoading(false);
        setProgressHandleImage(0);
        setStatusCopyToClipboard({
            url: "",
            row: 0,
            message: {
                vi: "",
                en: "",
            },
        });
    };

    const handleClearContent = () => {
        setImageURLs("");
        handleClearWithoutURLs();
    };

    const loadURLs = () => {
        handleClearWithoutURLs();
        setLoadingValidImages(true);
        checkValidImages();
    };

    useEffect(() => {
        loadURLs();
    }, [imageURLs]);

    const getProxyImageUrl = (url: string) => {
        if (isBase64Image(url)) {
            return url; // Trả về trực tiếp nếu là base64
        }

        // Sử dụng một dịch vụ proxy ảnh, ví dụ: images.weserv.nl
        return `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
    };

    useEffect(() => {
        const fetchBlobs = async () => {
            const newBlobUrls: Record<string, string | null> = {};

            for (const item of validImages) {
                try {
                    const response = await fetch(item.url);
                    const blob = await response.blob();
                    const blobUrl = URL.createObjectURL(blob);
                    newBlobUrls[item.url] = blobUrl;
                } catch (error) {
                    // console.error(`Failed to fetch or create URL for image at ${url}`, error);
                    newBlobUrls[item.url] = null; // Set to null if there's an error
                }
            }

            setBlobUrls(newBlobUrls);
        };

        fetchBlobs();

        // Clean up blob URLs when the component unmounts
        return () => {
            Object.values(blobUrls).forEach((url) => {
                if (url) URL.revokeObjectURL(url);
            });
        };
    }, [validImages]);

    const handleDownloadImages = async () => {
        setIsDownAllLoading(true);
        if (validImages.length === 0) {
            setAlert(T.page.handleDownloadImages.missingImage);
            setIsDownAllLoading(false);
            return;
        }

        if (folderName.trim() === "") {
            setAlert(T.page.handleDownloadImages.missingFolderName);
            setIsDownAllLoading(false);
            return;
        }

        setAlert(null);
        const zip = new JSZip();
        const folder = zip.folder(folderName);
        const usedFileNames: Record<string, boolean> = {};

        const getUniqueFileName = (baseFileName: string, dimensions: [number, number]): string => {
            const [width, height] = dimensions;
            const truncatedFileName = truncateFileName(baseFileName);
            let uniqueName = `${truncatedFileName}_${width}x${height}`;
            let counter = 1;

            while (usedFileNames[uniqueName]) {
                uniqueName = `${truncatedFileName}_${width}x${height} (${counter})`;
                counter++;
            }

            usedFileNames[uniqueName] = true;
            return uniqueName;
        };

        const downloadPromises = validImages
            .filter((img) => !excludedImages.has(img.url))
            .map(async (item) => {
                try {
                    let finalBlob;
                    let fileName = "";
                    let extension = "";

                    if (item.url.startsWith("data:image/")) {
                        // Nếu là base64, tạo Blob từ base64
                        const byteString = atob(item.url.split(",")[1]);
                        const mimeString = item.url.split(",")[0].split(":")[1].split(";")[0];
                        const ab = new Uint8Array(byteString.length);
                        for (let i = 0; i < byteString.length; i++) {
                            ab[i] = byteString.charCodeAt(i);
                        }
                        finalBlob = new Blob([ab], { type: mimeString });
                        fileName = `image_base64_${Date.now()}`; // Đặt tên cho ảnh base64
                        extension = mimeString.split("/")[1]; // Lấy phần mở rộng từ mime type
                    } else {
                        // Nếu là URL, sử dụng proxy để tải ảnh
                        const proxyUrl = getProxyImageUrl(item.url);
                        const response = await fetch(proxyUrl);
                        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                        finalBlob = await response.blob();
                        const urlParts = item.url.split("/");
                        fileName = urlParts[urlParts.length - 1].split("?")[0];
                        extension = `${fileName.split(".").pop()}`;
                    }

                    const img = new Image();
                    img.src = URL.createObjectURL(finalBlob);
                    await new Promise((resolve) => (img.onload = resolve));

                    const dimensions: [number, number] = [img.width, img.height];
                    const baseFileName = fileName.split(".").slice(0, -1).join(".");
                    const uniqueFileName = getUniqueFileName(baseFileName, dimensions);

                    folder?.file(`${uniqueFileName}.${extension}`, finalBlob);
                    URL.revokeObjectURL(img.src);
                } catch (error) {
                    console.error(`Error downloading image from ${item.url}:`, error);
                    // Có thể thêm logic để thông báo cho người dùng về ảnh không tải được
                }
            });

        try {
            await Promise.all(downloadPromises);
            const content = await zip.generateAsync({ type: "blob" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(content);
            link.download = `${folderName}.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error creating zip file:", error);
            window.alert("Failed to create zip file. Please try again.");
        } finally {
            setIsDownAllLoading(false);
        }
    };

    const downloadSingleImage = async (imageUrl: string) => {
        // Sử dụng proxy nếu có vấn đề CORS
        const proxyUrl = getProxyImageUrl(imageUrl);

        try {
            const imageResponse = await fetch(proxyUrl);
            if (!imageResponse.ok) {
                throw new Error("Failed to fetch image");
            }

            const imageBlob = await imageResponse.blob();

            // Kiểm tra nếu ảnh là WebP
            if (imageBlob.type === "image/webp") {
                const img = new Image();
                img.src = URL.createObjectURL(imageBlob);

                img.onload = function () {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext("2d");
                    if (ctx) {
                        ctx.drawImage(img, 0, 0);
                        canvas.toBlob(function (blob) {
                            if (blob) {
                                const link = document.createElement("a");
                                link.href = URL.createObjectURL(blob);
                                link.download = `${imageUrl.replace(".webp", ".jpg").split("?")[0].split("/").pop()}`;
                                link.click();
                            }
                        }, "image/jpeg");
                    }
                };
            } else {
                // Tải ảnh như nó vốn có nếu không phải là WebP
                const link = document.createElement("a");
                link.href = URL.createObjectURL(imageBlob);
                link.download = `${imageUrl.split("?")[0].split("/").pop()}`;
                link.click();
            }
        } catch (error) {
            console.error("Error downloading image:", error);
        }
    };

    // Phân nhóm các URL lỗi theo loại lỗi
    const groupedErrors = errorImages.reduce((groups, error) => {
        if (!groups[error.errorType]) {
            groups[error.errorType] = [];
        }
        groups[error.errorType].push(error);
        return groups;
    }, {} as { [key: string]: { url: string; index: number }[] });

    return (
        <Fragment>
            <Header />
            <Main>
                <Main_Container>
                    {/* BREADCRUMB */}
                    <Breadcrumb currentText={T.name} parentList={BreadcrumbParentTag} />
                    {/* BODY */}
                    <Box sx={{ width: { xs: "inherit", md: "80%", lg: "70%" }, my: 2, mx: "auto" }}>
                        <Typography
                            level="h1"
                            textColor={chooseThemeValueIn(color.black.dark, color.black.dark, systemMode)}
                            sx={{ bgcolor: "#", svg: { fontSize: "2rem" } }}
                        >
                            {isMobile ? T.page.title.xs : T.page.title.md}
                        </Typography>

                        <Grid container spacing={{ xs: 1, md: 2 }} sx={{ flexGrow: 1, pt: 4, pb: 1 }}>
                            {/* Nút tìm link ảnh */}
                            <Grid item xs={12} md={12}>
                                <Stack direction={"row"} justifyContent={"space-between"}>
                                    <FindImageLinksModal setImageURLs={setImageURLs} />
                                    <Button
                                        onClick={() => {
                                            setReloadImageURLs(true);
                                            loadURLs();
                                        }}
                                        color="primary"
                                        disabled={reloadImageURLs}
                                        loading={reloadImageURLs}
                                    >
                                        <Stack direction={"row"} gap={1} alignItems={"center"} justifyContent={"center"}>
                                            <Refresh />
                                            {!isMobile && T.page.buttonReload}
                                        </Stack>
                                    </Button>
                                </Stack>
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <Stack direction={"row"} alignItems={"center"} justifyContent={"end"} gap={1}>
                                    <Typography level="body-sm" textColor="neutral.600">
                                        {T.page.labelDelay} (3s → 10s):
                                    </Typography>
                                    <input
                                        type="number"
                                        value={delayTimeout}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDelayTimeout(+e.target.value)}
                                        min={3}
                                        max={10}
                                    />
                                    <Typography level="body-sm" textColor="neutral.600">
                                        (s)
                                    </Typography>
                                </Stack>
                                <textarea
                                    ref={textareaRef}
                                    value={imageURLs}
                                    onChange={(e) => {
                                        setImageURLs(e.target.value);
                                    }}
                                    rows={20}
                                    placeholder={T.page.textAreaPlaceholder}
                                    style={{
                                        width: "100%",
                                        minHeight: "172px",
                                        padding: "10px",
                                        margin: "10px 0",
                                        border: "1px solid #ddd",
                                        borderRadius: "4px",
                                        boxSizing: "border-box" as const,
                                        resize: "vertical" as const,
                                    }}
                                />
                                {loadingValidImages && <LinearProgressWithLabel text={T.page.progressLabel} progress={progress} />}
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={12}
                                sx={{
                                    bgcolor: color.body[systemMode],
                                    position: "sticky",
                                    top: MARGIN_HEADER,
                                    zIndex: 1,
                                }}
                            >
                                {/* Phần hiển thị thống kê ngay dưới textarea */}
                                <Grid item xs={12} md={12}>
                                    <Stack direction={"row"} gap={2} sx={{ alignItems: "center" }}>
                                        <Typography level="body-sm" textColor="neutral.600">
                                            {T.page.analytics.total}: {imageURLs.split("\n").filter((url) => url.trim() !== "").length}
                                        </Typography>
                                        <Typography level="body-sm" textColor="neutral.600">
                                            {T.page.analytics.success}: {validImages.length}
                                        </Typography>
                                        <Typography level="body-sm" textColor="neutral.600">
                                            {T.page.analytics.fail}: {errorImages.length}
                                        </Typography>
                                        {errorImages.length > 0 && (
                                            <Tooltip
                                                title={
                                                    <Stack gap={1} ref={tooltipRef}>
                                                        <Stack direction={"row"} justifyContent={"space-between"}>
                                                            <Typography level="title-lg" textColor={color.white.main} sx={{ p: 1 }}>
                                                                Danh sách URL lỗi
                                                            </Typography>
                                                            <Box
                                                                onClick={() => setShowTooltipShowError(false)}
                                                                sx={{
                                                                    pt: 0.5,
                                                                    pl: 1,
                                                                    ":hover": {
                                                                        cursor: "pointer",
                                                                    },
                                                                }}
                                                            >
                                                                <Close sx={{ color: color.white.main }} />
                                                            </Box>
                                                        </Stack>
                                                        <Divider />
                                                        <Stack
                                                            sx={{
                                                                // bgcolor: color.tooltip.dark,
                                                                position: "relative",
                                                                p: 1,
                                                                minWidth: { xs: 280, sm: 400 },
                                                                maxWidth: { xs: 280, sm: 600 },
                                                                maxHeight: 360,
                                                                overflow: "overlay",
                                                                "&::-webkit-scrollbar": {
                                                                    borderRadius: 4,
                                                                    width: 6,
                                                                },
                                                                "&::-webkit-scrollbar-thumb": {
                                                                    borderRadius: 4,
                                                                    backgroundColor: color.white.main,
                                                                },
                                                                "&::-webkit-scrollbar-track": {
                                                                    borderRadius: 4,
                                                                    backgroundColor: color.white.sub,
                                                                },
                                                            }}
                                                            spacing={1}
                                                        >
                                                            {Object.keys(groupedErrors).map((errorType) => (
                                                                <div key={errorType}>
                                                                    <Stack
                                                                        direction={"row"}
                                                                        alignItems={"center"}
                                                                        justifyContent={"space-between"}
                                                                        gap={2}
                                                                    >
                                                                        <Typography level="title-md" textColor={color.warning.main}>
                                                                            {`${errorType} (${groupedErrors[errorType].length})`}
                                                                        </Typography>
                                                                        <Stack direction={"row"} gap={1}>
                                                                            <CopyAll
                                                                                onClick={() => {
                                                                                    let urls = "";
                                                                                    groupedErrors[errorType].forEach(({ url, index }, mapIndex) => {
                                                                                        urls += `${url}\n`;
                                                                                    });

                                                                                    handleCopyToClipboard(urls, -1);
                                                                                }}
                                                                                sx={{
                                                                                    ":hover": {
                                                                                        color: color.secondary.main,
                                                                                        cursor: "pointer",
                                                                                    },
                                                                                }}
                                                                            />{" "}
                                                                        </Stack>
                                                                    </Stack>
                                                                    <Divider sx={{ mt: 1, bgcolor: color.warning.main }} />
                                                                    <ul
                                                                        style={{
                                                                            paddingLeft: "20px",
                                                                            listStyleType: "none",
                                                                            color: color.pink.light,
                                                                            margin: 0,
                                                                        }}
                                                                    >
                                                                        {groupedErrors[errorType].map(({ url, index }, mapIndex) => (
                                                                            <li key={url + index}>
                                                                                <Stack
                                                                                    direction="row"
                                                                                    gap={2}
                                                                                    justifyContent="space-between"
                                                                                    sx={{ py: 1 }}
                                                                                >
                                                                                    <Stack direction="row" gap={1}>
                                                                                        <Typography sx={{ minWidth: "10%" }} level="title-sm">
                                                                                            {`URL [${index}]`}:
                                                                                        </Typography>
                                                                                        <Typography
                                                                                            onClick={() => handleHighlightErrorUrl(url, index)}
                                                                                            sx={{
                                                                                                flexGrow: 1,
                                                                                                // wordBreak: "break-all",
                                                                                                color: color.pink.light,
                                                                                                ":hover": {
                                                                                                    color: color.secondary.main,
                                                                                                    cursor: "pointer",
                                                                                                },
                                                                                            }}
                                                                                            level="title-sm"
                                                                                        >
                                                                                            {isMobile ? url.substring(0, 20) : url.substring(0, 50)}
                                                                                            {url.length > 50 && "[...]"}
                                                                                        </Typography>
                                                                                    </Stack>

                                                                                    <Stack direction={"row"} alignItems={"start"} gap={1}>
                                                                                        <ContentCopy
                                                                                            onClick={() => handleCopyToClipboard(url, index)}
                                                                                            sx={{
                                                                                                fontSize: "md",
                                                                                                color:
                                                                                                    statusCopyToClipboard.row === index
                                                                                                        ? color.secondary.main
                                                                                                        : "",
                                                                                                ":hover": {
                                                                                                    color: color.secondary.main,
                                                                                                    cursor: "pointer",
                                                                                                },
                                                                                            }}
                                                                                        />
                                                                                        <a
                                                                                            href={`${url}`}
                                                                                            target="_blank"
                                                                                            rel="noopener noreferrer nofollow"
                                                                                            style={{ textDecoration: "none" }}
                                                                                        >
                                                                                            <OpenInNew
                                                                                                sx={{
                                                                                                    fontSize: "md",
                                                                                                    ":hover": {
                                                                                                        color: color.secondary.main,
                                                                                                        cursor: "pointer",
                                                                                                    },
                                                                                                }}
                                                                                            />
                                                                                        </a>
                                                                                    </Stack>
                                                                                </Stack>
                                                                                {mapIndex < groupedErrors[errorType].length - 1 ? <Divider /> : ""}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            ))}
                                                        </Stack>
                                                        {statusCopyToClipboard.row !== 0 && (
                                                            <Stack>
                                                                <Typography fontSize={"xs"} textAlign={"center"}>
                                                                    {statusCopyToClipboard.message[lang]}
                                                                </Typography>
                                                            </Stack>
                                                        )}
                                                    </Stack>
                                                }
                                                placement="bottom-start"
                                                open={showTooltipShowError} // Hiển thị khi icon được click
                                                arrow // Mũi tên trên tooltip
                                            >
                                                <ErrorOutline
                                                    onClick={handleToggleTooltipShowError}
                                                    sx={{ scale: ".7 .7", cursor: "pointer", color: color.pink.main }}
                                                />
                                            </Tooltip>
                                        )}
                                    </Stack>
                                    <Stack direction={"row"} gap={2} sx={{ alignItems: "center", mt: 1 }}>
                                        <Typography level="body-sm" textColor="neutral.600">
                                            {/* Thống kê số lượng ảnh trùng */}
                                            {T.page.analytics.duplicates}: {Object.keys(duplicates).length} {T.page.analytics.duplicatesGroup}
                                        </Typography>

                                        {/* Nút xóa ảnh có chất lượng thấp */}
                                        {/* {!!Object.keys(duplicates).length && (
                                            <Button
                                                variant="solid"
                                                color="warning"
                                                size="sm"
                                                disabled={isHandleDuplicateLoading}
                                                onClick={handleRemoveAllLowerQuality}
                                                endDecorator={
                                                    isHandleDuplicateLoading ? (
                                                        <CircularProgress
                                                            size="sm"
                                                            variant="solid"
                                                            color="warning"
                                                            sx={{ scale: ".7 .7" }}
                                                            thickness={4}
                                                        />
                                                    ) : null
                                                }
                                            >
                                                <Typography level="title-sm">
                                                    {isHandleDuplicateLoading ? `${progressHandleImage}%` : T.page.buttonHandleDuplicate}
                                                </Typography>
                                            </Button>
                                        )} */}
                                    </Stack>
                                </Grid>

                                <Grid item xs={12} md={12}>
                                    <Grid container spacing={{ xs: 1, md: 2 }} sx={{ flexGrow: 1, alignItems: "end" }}>
                                        <Grid item xs={12} md={8}>
                                            <Box>
                                                <label
                                                    style={{
                                                        display: "block",
                                                        margin: "10px 0",
                                                        fontWeight: "bold" as const,
                                                        color: "#333",
                                                    }}
                                                >
                                                    {T.page.folderNameLabel}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={folderName}
                                                    onChange={(e) => setFolderName(e.target.value)}
                                                    placeholder={T.page.folderNamePlaceholder}
                                                    style={{
                                                        width: "100%",
                                                        padding: "10px",
                                                        border: "1px solid #ddd",
                                                        borderRadius: "4px",
                                                        boxSizing: "border-box" as const,
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <Stack direction={"row"} gap={2} sx={{ flexGrow: 1, justifyContent: { xs: "center", md: "right" } }}>
                                                <Button onClick={handleClearContent} color="danger" startDecorator={<Delete />}>
                                                    {T.page.buttonClear}
                                                </Button>
                                                <Button
                                                    loading={isDownAllLoading}
                                                    disabled={validImages.length <= 0}
                                                    onClick={handleDownloadImages}
                                                    startDecorator={<Download />}
                                                    sx={{ flexGrow: 1 }}
                                                >
                                                    {T.page.buttonDownloadAll}
                                                </Button>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                    {alert && (
                                        <Box
                                            sx={{
                                                mt: 2,
                                                color: "red",
                                                fontSize: ".8rem",
                                                fontWeight: "bold",
                                                textAlign: "center",
                                            }}
                                        >
                                            {alert}
                                        </Box>
                                    )}
                                    {validImages.length > 0 && (
                                        <Box sx={{ mt: 2 }}>
                                            <Divider sx={{ my: 2 }}>
                                                {validImages.filter((item) => !excludedImages.has(item.url)).length} {T.page.showStart}
                                            </Divider>
                                        </Box>
                                    )}
                                </Grid>
                            </Grid>

                            {/* Preview ảnh hợp lệ */}
                            {validImages.length > 0 && (
                                <Grid item xs={12}>
                                    <Grid container spacing={{ xs: 1, md: 1 }} sx={{ flexGrow: 1, overflow: "hidden" }}>
                                        {validImages.map((item, index) => {
                                            // Check if the image is excluded
                                            if (excludedImages.has(item.url)) {
                                                return null; // Skip rendering the excluded image
                                            }

                                            const proxyUrl = getProxyImageUrl(item.url);
                                            const serialNum = index + 1;

                                            return (
                                                <Grid item xs={6} sm={3} md={2} key={index}>
                                                    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
                                                        {/* Hiển thị số thứ tự */}
                                                        <Stack
                                                            direction={"row"}
                                                            alignItems={"center"}
                                                            justifyContent={"space-between"}
                                                            sx={{
                                                                position: "absolute",
                                                                top: 0,
                                                                left: 0,
                                                                right: 0,
                                                                margin: "5px",
                                                            }}
                                                        >
                                                            <Typography
                                                                sx={{
                                                                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                                                                    color: "white",
                                                                    padding: "2px 5px",
                                                                    borderRadius: "4px",
                                                                    fontWeight: "bold",
                                                                    fontSize: "0.8rem",
                                                                }}
                                                            >
                                                                {serialNum}
                                                            </Typography>

                                                            <Stack direction={"row"} alignItems={"center"} gap={1}>
                                                                <Tooltip title={"Vị trí URL"} arrow size="sm" placement="bottom-end">
                                                                    <HighlightAlt
                                                                        onClick={() => handleHighlightErrorUrl(item.url, item.row)}
                                                                        sx={{
                                                                            color: "white",
                                                                            fontSize: "1rem",
                                                                            padding: "2px",
                                                                            borderRadius: "4px",
                                                                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                                                                            transition: "all ease-in-out .2s",

                                                                            ":hover": {
                                                                                cursor: "pointer",
                                                                                backgroundColor: "rgba(0, 0, 0, 0.6)",
                                                                            },
                                                                        }}
                                                                    />
                                                                </Tooltip>
                                                                {/* <Tooltip title={"Xem chi tiết"} arrow size="sm" placement="bottom-end">
                                                                    <InfoOutlined
                                                                        sx={{
                                                                            color: "white",
                                                                            fontSize: "1rem",
                                                                            padding: "2px",
                                                                            borderRadius: "4px",
                                                                            backgroundColor: "rgba(0, 0, 0, 0.2)",
                                                                            transition: "all ease-in-out .2s",

                                                                            ":hover": {
                                                                                cursor: "pointer",
                                                                                backgroundColor: "rgba(0, 0, 0, 0.6)",
                                                                            },
                                                                        }}
                                                                    />
                                                                </Tooltip> */}
                                                            </Stack>
                                                        </Stack>

                                                        <img
                                                            src={proxyUrl}
                                                            alt={`preview-${index}`}
                                                            onError={(e) => {
                                                                console.error(`Failed to load image at ${item.url}`);
                                                                (e.target as HTMLImageElement).src = "/path/to/fallback/image.jpg"; // Thêm một ảnh fallback
                                                            }}
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                objectFit: "cover",
                                                                border: "1px solid #ddd",
                                                                borderRadius: "4px",
                                                            }}
                                                        />

                                                        {/* Nút xóa */}
                                                        <Button
                                                            variant="solid"
                                                            color="danger"
                                                            size="sm"
                                                            sx={{
                                                                position: "absolute",
                                                                bottom: 0,
                                                                left: 0,
                                                                margin: "5px",
                                                                fontSize: "0.7rem",
                                                            }}
                                                            onClick={() => {
                                                                setExcludedImages((prev) => new Set(prev).add(item.url));
                                                            }}
                                                        >
                                                            <Delete />
                                                        </Button>

                                                        {/* Nút tải ngay */}
                                                        <Button
                                                            variant="solid"
                                                            color="primary"
                                                            size="sm"
                                                            sx={{
                                                                position: "absolute",
                                                                bottom: 0,
                                                                right: 0,
                                                                margin: "5px",
                                                                fontSize: "0.7rem",
                                                            }}
                                                            onClick={() => downloadSingleImage(item.url)}
                                                        >
                                                            <Download />
                                                        </Button>
                                                    </Box>
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                    <Divider sx={{ my: 2 }}>{T.page.showEnd}</Divider>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                </Main_Container>
            </Main>
        </Fragment>
    );
}

// Helper function to compare image resolutions or sizes
const getImageResolution = async (imageUrl: string) => {
    return new Promise<{ width: number; height: number }>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = reject;
        img.src = imageUrl;
    });
};

// Hàm rút ngắn tên file
const truncateFileName = (fileName: string): string => {
    const maxLength = 20;
    return fileName.length > maxLength ? fileName.substring(0, maxLength) : fileName;
};

// Hàm chuyển đổi webp sang jpg
const convertWebpToJpg = (blob: Blob): Promise<Blob> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = URL.createObjectURL(blob);

        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                canvas.toBlob((newBlob) => {
                    if (newBlob) resolve(newBlob);
                }, "image/jpeg");
            }
            URL.revokeObjectURL(img.src); // Giải phóng bộ nhớ
        };
    });
};
