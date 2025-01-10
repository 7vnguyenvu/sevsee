const folderNameDefault = "sevsee-images";

const defaultExport = {
    head: {
        title: "Tools & Services",
        // description: "Công cụ của SEE.ME - chia sẻ các tính năng và dịch vụ hỗ trợ bạn trong công việc và học tập hiệu quả nhất.",
        description: "SEE.ME Tools - sharing features and services to support you in your work and study most effectively.",
    },
    page: {
        title: {
            xs: `Services`,
            md: `Services`,
        },
        description: {
            xs: `[ SEE.ME ]
Support you most effectively!`,
            md: `[ SEE.ME ] Tools
Share features and services to support you in your work and study most effectively.`,
        },
        showEnd: "More to come! Stay tuned!",
    },
    imageGetter: {
        name: "Image Getter",
        head: {
            title: "Get images via URLs",
            description: "A tool to quickly get images from URLs - Get images from a list quickly and effectively.",
        },
        page: {
            title: {
                xs: `Get by URLs`,
                md: `Download images from your URL list`,
            },
            help: "Guide & Help",
            helpSubtitle: "Problems you may encounter !!",
            labelDelay: "Time out",
            textAreaPlaceholder: "Enter a list of image URLs, one per line",
            folderNameLabel: "Name the container",
            folderNameDefault,
            folderNameDefaultLabel: `Default: ${folderNameDefault}.zip`,
            folderNamePlaceholder: "Example: List of images",
            progressLabel: "Searching for images…",
            handleDownloadImages: {
                missingImage: "There are no valid images to download.",
                missingFolderName: "Enter a folder name containing the images!",
                errorDownloading: "Error download images",
            },
            checkValidImagesFail: "Error fetching images:",
            analytics: {
                total: "Total URLs",
                success: "Best URL",
                fail: "Error URLs",
                duplicates: "Duplicate URLs",
                duplicatesGroup: "groups",
            },
            buttonReload: "Reload",
            buttonHandleDuplicate: "Clean up now",
            buttonClear: "Refresh",
            buttonDownloadAll: "Download all",
            showStart: "Results are showing",
            showEnd: "All results shown!",
            urlPos: "View URL location",
            urlRemoveShow: "Remove from results list",
        },
        modal: {
            FindImageLinksModal: {
                handleFindImageLinks_Null: "No image links found.",
                buttonOpenModalText: "Find URLs in text ⚡",
                buttonFindText: "Find",
                titleModal: "Find URLs ⚡",
                placeholderTextarea: "Paste text containing image links here...",
            },
        },
    },
};

export default defaultExport;
