import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/joy";
import { ContainerContentText, TextAlignLeft, color } from "@/components";

import { Fragment } from "react";
import { YouTube } from "@mui/icons-material";
import { useGlobalContext } from "@/context/store";

export function ImgGetter__Usage() {
    const { lang } = useGlobalContext();

    const title: Record<string, string> = {
        vi: "Đây là gì?",
        en: "What and How?",
    };

    const getContent: Record<string, JSX.Element> = {
        vi: <Vietnamese_Text />,
        en: <English_Text />,
    };
    return (
        <Accordion>
            <AccordionSummary>
                <Typography level={"h2"}>{title[lang]}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <ContainerContentText sx={{ px: 1 }}>{getContent[lang]}</ContainerContentText>
            </AccordionDetails>
        </Accordion>
    );
}

const Vietnamese_Text = () => (
    <Fragment>
        <p>
            Xin chào!{" "}
            <a href="/" target="_blank">
                <strong>SEVSEE - SEE.ME</strong>
            </a>{" "}
            giới thiệu công cụ{" "}
            <a href="/tools/image-getter" target="_blank">
                <strong>Image Getter Online</strong>
            </a>{" "}
            (Trình thu thập ảnh), giúp bạn tìm kiếm và tải xuống nhiều ảnh cùng lúc từ các URL một cách nhanh chóng, tiết kiệm thời gian.
        </p>

        <Typography level={"h3"}>1. Image Getter Online</Typography>
        <Box sx={{ position: "relative", zIndex: 0 }}>
            <img
                src="https://img001.prntscr.com/file/img001/k2hkhumQT-6war-hw88DQA.png"
                alt="sevsee-tool-img-getter"
                title="Trình thu thập ảnh ⚡"
                width={"100%"}
                height={"100%"}
                draggable={false}
            />
            <a href="https://youtu.be/0DX2A3RRLGU" target="_blank">
                <YouTube
                    sx={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%,-50%)",
                        fontSize: { xs: "3rem", md: "4rem" },
                        color: "red",
                        ":hover": {
                            cursor: "pointer",
                            color: "darkred",
                        },
                    }}
                />
            </a>
        </Box>
        <TextAlignLeft>
            <p style={{ marginBottom: 0 }}>Các tính năng chính:</p>
            <ul style={{ marginTop: 0 }}>
                <li>Tìm kiếm ảnh nhanh chóng qua URL</li>
                <li>Tải xuống hàng loạt ảnh cùng lúc</li>
                <li>Hỗ trợ nhiều định dạng ảnh phổ biến</li>
                <li>Giao diện đơn giản, dễ sử dụng</li>
            </ul>
            <p style={{ marginBottom: 0 }}>Lợi ích:</p>
            <ul style={{ marginTop: 0 }}>
                <li>Tiết kiệm thời gian tìm kiếm</li>
                <li>Không cần tải từng ảnh thủ công</li>
                <li>Quản lý ảnh hiệu quả</li>
                <li>Phù hợp cho nhiều mục đích</li>
            </ul>
        </TextAlignLeft>

        <Typography level={"h3"}>2. Sử dụng tìm ảnh</Typography>
        <Box
            sx={{
                px: 1,
                py: 0.5,
                bgcolor: color.warning.light,
                borderRadius: "sm",
                color: color.warning.contrastText,
                "& p": { m: 0 },
            }}
        >
            <p>
                Bạn có thể xem video hướng dẫn <strong>"cơ bản"</strong> bằng cách bấm vào biểu tượng YouTube phía trên hoặc bấm vào{" "}
                <a href="https://youtu.be/0DX2A3RRLGU" target="_blank">
                    <strong>Xem hướng dẫn trên YouTube</strong>
                </a>
                .
            </p>
        </Box>
        <TextAlignLeft sx={{ mt: "1em" }}>
            <p style={{ marginBottom: 0 }}>Đối với danh sách URL sẵn có:</p>
            <ol style={{ marginTop: 0 }}>
                <li>Trực tiếp Nhập/Dán URLs cần tìm</li>
                <li>Đợi tiến trình tìm kiếm hoàn tất</li>
                <li>Tiến hành tải ảnh</li>
            </ol>
            <p style={{ marginBottom: 0 }}>Tìm kiếm ảnh trong văn bản/HTML:</p>
            <ol style={{ marginTop: 0 }}>
                <li>Bấm vào "Tìm URLs trong văn bản"</li>
                <li>Dán đoạn văn bản/HTML cần tìm</li>
                <li>Nhấn vào "Tìm"</li>
                <li>Đợi tiến trình tìm kiếm hoàn tất</li>
                <li>Tiến hành tải ảnh</li>
            </ol>
        </TextAlignLeft>

        <Typography level={"h3"}>3. Lựa chọn tải ảnh</Typography>
        <p style={{ marginBottom: 0 }}>
            Trong kết quả hiển thị các ảnh được tìm thấy, bạn có thể lựa chọn các cách sau để tải ảnh xuống theo ý mình:
        </p>
        <ol style={{ marginTop: 0 }}>
            <li>Tải từng ảnh một</li>
            <li>Tải tất cả</li>
        </ol>
    </Fragment>
);

const English_Text = () => (
    <Fragment>
        <p>
            Hi!{" "}
            <a href="/" target="_blank">
                <strong>SEVSEE - SEE.ME</strong>
            </a>{" "}
            introduces the{" "}
            <a href="/tools/image-getter" target="_blank">
                <strong>Image Getter Online</strong>
            </a>{" "}
            tool, which helps you search and download multiple images at once from URLs quickly, saving time.
        </p>
        <Typography level={"h3"}>1. Image Getter Online</Typography>
        <Box sx={{ position: "relative", zIndex: 0 }}>
            <img
                src="https://img001.prntscr.com/file/img001/k2hkhumQT-6war-hw88DQA.png"
                alt="sevsee-tool-img-getter"
                title="Trình thu thập ảnh ⚡"
                width={"100%"}
                height={"100%"}
                draggable={false}
            />
            <a href="https://youtu.be/0DX2A3RRLGU" target="_blank">
                <YouTube
                    sx={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%,-50%)",
                        fontSize: { xs: "3rem", md: "4rem" },
                        color: "red",
                        ":hover": {
                            cursor: "pointer",
                            color: "darkred",
                        },
                    }}
                />
            </a>
        </Box>
        <TextAlignLeft>
            <p style={{ marginBottom: 0 }}>Main features:</p>
            <ul style={{ marginTop: 0 }}>
                <li>Quickly search for images via URL</li>
                <li>Download multiple images at once</li>
                <li>Support many popular image formats</li>
                <li>Simple, easy-to-use interface</li>
            </ul>
            <p style={{ marginBottom: 0 }}>Benefits:</p>
            <ul style={{ marginTop: 0 }}>
                <li>Save time searching</li>
                <li>No need to manually download each image</li>
                <li>Efficient image management fruit</li>
                <li>Suitable for many purposes</li>
            </ul>
        </TextAlignLeft>
        <Typography level={"h3"}>2. Using image search</Typography>
        <Box
            sx={{
                px: 1,
                py: 0.5,
                bgcolor: color.warning.light,
                borderRadius: "sm",
                color: color.warning.contrastText,
                "& p": { m: 0 },
            }}
        >
            <p>
                You can watch the <strong>"basic"</strong> tutorial video by clicking the YouTube icon above or clicking{" "}
                <a href="https://youtu.be/0DX2A3RRLGU" target="_blank">
                    <strong>Watch the tutorial on YouTube</strong>
                </a>
                .
            </p>
        </Box>
        <TextAlignLeft sx={{ mt: "1em" }}>
            <p style={{ marginBottom: 0 }}>For the available URL list:</p>
            <ol style={{ marginTop: 0 }}>
                <li>Directly Enter/Paste the URLs you want to find</li>
                <li>Wait for the search process to complete</li>
                <li>Proceed to upload the image</li>
            </ol>
            <p style={{ marginBottom: 0 }}>Search for images in text/HTML:</p>
            <ol style={{ marginTop: 0 }}>
                <li>Click "Find URLs in text"</li>
                <li>Paste the text/HTML you want to find</li>
                <li>Click "Find"</li>
                <li>Wait for the search process to complete</li>
                <li>Proceed to upload the image</li>
            </ol>
        </TextAlignLeft>
        <Typography level={"h3"}>3. Choose to download images</Typography>
        <p style={{ marginBottom: 0 }}>
            In the results showing the found images, you can choose the following ways to download the images as you like:
        </p>
        <ol style={{ marginTop: 0 }}>
            <li>Download each image one by one</li>
            <li>Download all</li>
        </ol>
    </Fragment>
);
