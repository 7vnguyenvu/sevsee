import { Box } from "@mui/joy";
import { color } from "@/components";
import { keyframes } from "@mui/material";

export function Loading() {
    return (
        <Box
            sx={{
                margin: "auto",
                my: "50px",
                animation: `${rotate} 1s infinite`,
                height: "50px",
                width: "50px",

                ":before, :after": {
                    borderRadius: " 50%",
                    content: '""',
                    display: "block",
                    height: "20px",
                    width: "20px",
                },
                ":before": {
                    animation: `${ball1} 1s infinite`,
                    backgroundColor: color.white.main,
                    boxShadow: `30px 0 0 ${color.primary.main}`,
                    marginBottom: "10px",
                },
                ":after": {
                    animation: `${ball2} 1s infinite`,
                    backgroundColor: color.primary.main,
                    boxShadow: `30px 0 0 ${color.white.main}`,
                },
            }}
        ></Box>
    );
}

const rotate = keyframes`
    0% { transform: rotate(0deg) scale(0.8) }
    50% { transform: rotate(360deg) scale(1.2) }
    100% { transform: rotate(720deg) scale(0.8) }
  
    `;

const ball1 = keyframes`
    0% {
      box-shadow: 30px 0 0 ${color.primary.main};
    }
    50% {
      box-shadow: 0 0 0 ${color.primary.main};
      margin-bottom: 0;
      transform: translate(15px, 15px);
    }
    100% {
      box-shadow: 30px 0 0 ${color.primary.main};
      margin-bottom: 10px;
    }
  
    `;

const ball2 = keyframes`
    0% {
      box-shadow: 30px 0 0 ${color.white.main};
    }
    50% {
      box-shadow: 0 0 0 ${color.white.main};
      margin-top: -20px;
      transform: translate(15px, 15px);
    }
    100% {
      box-shadow: 30px 0 0 ${color.white.main};
      margin-top: 0;
    }
  
    `;
