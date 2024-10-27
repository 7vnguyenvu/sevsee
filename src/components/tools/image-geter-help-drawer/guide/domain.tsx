import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/joy";

import { ContainerContentText } from "@/components";

export function ImgGetter__DomainErr() {
    return (
        <Accordion>
            <AccordionSummary>
                <Typography level={"h2"}>Lỗi: Sai Domain</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <ContainerContentText sx={{ px: 1 }}>
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
                </ContainerContentText>
            </AccordionDetails>
        </Accordion>
    );
}
