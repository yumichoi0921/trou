import backgroundVideo from "../img/background.mp4";
import * as React from "react";
import styles from "../FirstMain/FirstMain.module.css";
import {
  Card,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  Button,
} from "@mui/material";
import Item from "../plan/child/Item";
import axios from "axios";
import title from "../img/placetitle.png";
export default function SelectPlace() {
  const [placeList, setPlaceList] = React.useState(() => [""]);
  const [formats, setFormats] = React.useState(() => []);

  const handleFormat = (event, newFormats) => {
    if (newFormats.length > 3) {
      alert("3가지 이하로 선택해 주세요");
    } else {
      setFormats(newFormats);
    }
  };

  const selected = () => {
    const userId = localStorage.getItem("userId");
    const placeId = formats;

    axios
      .post(
        "/history/" + userId,
        placeId.map((p) => {
          return {
            placeId: p,
          };
        })
      )
      .then((res) => {
        document.location.href = "/main";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.backgound}>
      <video autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div className={styles.Card_chip}>
        <Card>
          <div className={styles.select_title}>
            {" "}
            {/* <h2>좋아하는 장소 3개 이하 선택해 주세요</h2>
             */}
            <img src={title} alt="title"></img>
          </div>

          <div className={styles.ToggleButton_Group} style={{ width: "100%" }}>
            <ToggleButtonGroup
              value={formats}
              onChange={handleFormat}
              aria-label="text formatting"
            >
              <ToggleButton value="125806" aria-label="bold" sx={{ margin: 1 }}>
                {" "}
                <Stack>
                  <Item>
                    <img
                      width="200"
                      src="https://www.enewstoday.co.kr/news/photo/202004/1378437_439709_3650.jpg"
                      alt="title"
                    ></img>
                  </Item>
                  <Item>
                    <span> 설악 흔들바위</span>
                  </Item>
                </Stack>
              </ToggleButton>
              <ToggleButton value="125994" aria-label="bold" sx={{ margin: 1 }}>
                {" "}
                <Stack>
                  <Item>
                    <img
                      width="220"
                      src="https://image.mycelebs.com/travel/new/ho/390551_ho_1499086648.jpg"
                      alt="title"
                    ></img>
                  </Item>
                  <Item>
                    <span> 대전 엑스포 과학 공원</span>
                  </Item>
                </Stack>
              </ToggleButton>
              <ToggleButton value="126537" aria-label="bold" sx={{ margin: 1 }}>
                {" "}
                <Stack>
                  <Item>
                    <img
                      width="240"
                      src="https://youimg1.tripcdn.com/target/100p11000000r4rhv9EF4_C_750_420.jpg_.webp?proc=source%2Ftrip"
                      alt="title"
                    ></img>
                  </Item>
                  <Item>
                    <span> 북촌 한옥 마을</span>
                  </Item>
                </Stack>
              </ToggleButton>
              <ToggleButton
                value="2781700"
                aria-label="bold"
                sx={{ margin: 1 }}
              >
                {" "}
                <Stack>
                  <Item>
                    <img
                      width="200"
                      src="https://shopping-phinf.pstatic.net/main_8322800/83228001140.1.jpg"
                      alt="title"
                    ></img>
                  </Item>
                  <Item>
                    <span> 여주 그린 수상 레저</span>
                  </Item>
                </Stack>
              </ToggleButton>
            </ToggleButtonGroup>

            <ToggleButtonGroup
              value={formats}
              onChange={handleFormat}
              aria-label="text formatting"
            >
              <ToggleButton value="125657" aria-label="bold" sx={{ margin: 1 }}>
                {" "}
                <Stack>
                  <Item>
                    <img
                      width="200"
                      src="https://mblogthumb-phinf.pstatic.net/MjAxOTA4MTJfMjk4/MDAxNTY1NTY0ODM3MTg2.O1MbKNhIUDyATucPgaX3rzSoMPttPMcd3GdEf8Vs9hUg.YDDS17hrDhJuT1CESfaQg4orcWu_OaItw2mb9ntZGK4g.JPEG.hong273526/SE-3156ace4-4602-4bcc-a223-56e0e4baa637.jpg?type=w800"
                      alt="title"
                    ></img>
                  </Item>
                  <Item>
                    <span> 청평사 계곡</span>
                  </Item>
                </Stack>
              </ToggleButton>
              <ToggleButton value="126081" aria-label="bold" sx={{ margin: 1 }}>
                {" "}
                <Stack>
                  <Item>
                    <img
                      width="220"
                      src="https://image.ajunews.com/content/image/2021/12/09/20211209100930832728.jpg"
                      alt="title"
                    ></img>
                  </Item>
                  <Item>
                    <span> 해운대 해수욕장</span>
                  </Item>
                </Stack>
              </ToggleButton>
              <ToggleButton value="126498" aria-label="bold" sx={{ margin: 1 }}>
                {" "}
                <Stack>
                  <Item>
                    <img
                      width="240"
                      src="https://ldb-phinf.pstatic.net/20210609_292/1623216519739APfji_JPEG/Magiccastle.jpg"
                      alt="title"
                    ></img>
                  </Item>
                  <Item>
                    <span> 롯데월드</span>
                  </Item>
                </Stack>
              </ToggleButton>
              <ToggleButton
                value="2710813"
                aria-label="bold"
                sx={{ margin: 1 }}
              >
                {" "}
                <Stack>
                  <Item>
                    <img
                      width="200"
                      src="https://dimg.donga.com/wps/NEWS/IMAGE/2017/09/23/86469293.2.jpg"
                      alt="title"
                    ></img>
                  </Item>
                  <Item>
                    <span> 요트&수산어촌체험(양양)</span>
                  </Item>
                </Stack>
              </ToggleButton>
            </ToggleButtonGroup>

            <ToggleButtonGroup
              value={formats}
              onChange={handleFormat}
              aria-label="text formatting"
            >
              <ToggleButton value="130317" aria-label="bold" sx={{ margin: 1 }}>
                {" "}
                <Stack>
                  <Item>
                    <img
                      width="200"
                      src="https://t1.daumcdn.net/cfile/blog/247C2F50519C459326"
                      alt="title"
                    ></img>
                  </Item>
                  <Item>
                    <span> 테디베어뮤지엄</span>
                  </Item>
                </Stack>
              </ToggleButton>
              <ToggleButton value="560408" aria-label="bold" sx={{ margin: 1 }}>
                {" "}
                <Stack>
                  <Item>
                    <img
                      width="220"
                      src="https://cdn.kado.net/news/photo/201707/865314_345776_5434.jpg"
                      alt="title"
                    ></img>
                  </Item>
                  <Item>
                    <span> 바다열차</span>
                  </Item>
                </Stack>
              </ToggleButton>
              <ToggleButton value="131301" aria-label="bold" sx={{ margin: 1 }}>
                {" "}
                <Stack>
                  <Item>
                    <img
                      width="240"
                      src="https://www.sonohotelsresorts.com/cimage/we/Resort/202111/images/DmWebA_1637734121790.jpg"
                      alt="title"
                    ></img>
                  </Item>
                  <Item>
                    <span> 비발디파크 스키장</span>
                  </Item>
                </Stack>
              </ToggleButton>
              <ToggleButton value="264512" aria-label="bold" sx={{ margin: 1 }}>
                {" "}
                <Stack>
                  <Item>
                    <img
                      width="200"
                      src="https://t1.daumcdn.net/cfile/tistory/990374445C3830C032"
                      alt="title"
                    ></img>
                  </Item>
                  <Item>
                    <span> 인천 차이나타운</span>
                  </Item>
                </Stack>
              </ToggleButton>
            </ToggleButtonGroup>
          </div>

          <div className={styles.place_button}>
            <Button variant="contained" size="large" onClick={() => selected()}>
              선택 완료
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
