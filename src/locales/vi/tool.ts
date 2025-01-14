const folderNameDefault = "sevsee-images";

const defaultExport = {
    head: {
        title: "Công cụ & Dịch vụ",
        description:
            "Công cụ của SEE.ME - chia sẻ các tính năng và dịch vụ hữu ích, giúp bạn nâng cao hiệu quả trong công việc và học tập một cách tối ưu nhất.",
    },
    page: {
        title: {
            xs: `Dịch vụ`,
            md: `Dịch vụ`,
        },
        description: {
            xs: `[ SEE.ME ] Tools
Hỗ trợ bạn hiệu quả nhất!`,
            md: `Công cụ của [ SEE.ME ]
Chia sẻ các tính năng và dịch vụ hỗ trợ bạn trong công việc và học tập hiệu quả nhất.`,
        },
        showEnd: "Sẽ còn nhiều nữa! Hãy theo dõi nhé!",
    },
    imageGetter: {
        name: "Trình thu thập Ảnh",
        head: {
            title: "Tải ảnh từ danh sách URL của bạn",
            description:
                "Công cụ hỗ trợ lấy ảnh nhanh từ URL - giúp bạn trích xuất ảnh theo danh sách một cách nhanh chóng và hiệu quả, tiết kiệm thời gian và công sức tối đa.",
        },
        page: {
            title: {
                xs: `Tải ảnh từ URLs`,
                md: `Tải ảnh từ danh sách URL của bạn`,
            },
            help: "Hướng dẫn & Trợ giúp",
            helpSubtitle: "Những vấn đề bạn có thể gặp phải !!",
            labelDelay: "Thời gian chờ",
            textAreaPlaceholder: "Nhập danh sách URL ảnh, mỗi dòng là một URL",
            folderNameLabel: "Đặt tên cho file chứa",
            folderNameDefault,
            folderNameDefaultLabel: `Mặc định: ${folderNameDefault}.zip`,
            folderNamePlaceholder: "Ví dụ: Danh sách ảnh",
            progressLabel: "Đang tìm ảnh…",
            handleDownloadImages: {
                missingImage: "Không có ảnh hợp lệ để tải.",
                missingFolderName: "Hãy nhập tên file chứa ảnh để nén!",
                errorDownloading: "Lỗi khi tải hình ảnh",
            },
            checkValidImagesFail: "Lỗi khi tải hình ảnh:",
            analytics: {
                total: "Tổng số URL",
                success: "URL tốt nhất",
                fail: "URL lỗi",
                duplicates: "URL trùng lặp",
                duplicatesGroup: "nhóm",
            },
            buttonReload: "Tìm nạp lại",
            buttonHandleDuplicate: "Xử lý ngay",
            buttonClear: "Làm mới",
            buttonDownloadAll: "Tải tất cả",
            showStart: "Kết quả ảnh đang hiển thị",
            showEnd: "Tất cả kết quả đã được hiển thị!",
            urlPos: "Xem vị trí URL",
            urlRemoveShow: "Xóa khỏi hiển thị",
        },
        modal: {
            FindImageLinksModal: {
                handleFindImageLinks_Null: "Không tìm thấy link ảnh nào.",
                buttonOpenModalText: "Tìm URLs trong văn bản ⚡",
                buttonFindText: "Tìm",
                titleModal: "Tìm URLs ⚡",
                placeholderTextarea: "Dán đoạn văn bản có chứa link ảnh vào đây...",
            },
        },
    },
};

export default defaultExport;
