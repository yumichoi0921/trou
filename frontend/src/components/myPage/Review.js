import styles from './MyPage.module.css';
import background from './background.png';
import { FaStar } from "react-icons/fa";
import React, { useEffect, useState } from "react";

const Review = ({score}) => {
    console.log("리뷰")
    console.log(score)
    const [clicked, setClicked] = useState([false, false, false, false, false]);
    

  //별을 클릭해서 별이 채워진다 (리뷰 쓰기)
  const handleStarClick = (e, index) => {
    e.preventDefault();
    //let clickStates = [...clicked];
    //console.log(clickStates);
    for (let i = 0; i < 5; i++) {
      if (i <= index) clickStates[i] = true;
      else clickStates[i] = false;
    }

    setClicked(clickStates);
  };

  //별점수를 가져오기 위함 (리뷰 조회)
  let clickStates = [...clicked];
  useEffect(()=> {
    //console.log('헬로')
    //console.log(score)
    for (let i = 0; i < 5; i++) {
        if (i <= score) clickStates[i] = true;
        else clickStates[i] = false;
    }
    setClicked(clickStates);
  }, [])
  
  return(
   <div className={styles.rating}>
    <p>Rating</p>
    <div>
      <FaStar
        onClick={(e) => handleStarClick(e, 0)}
        className={clicked[0] ? styles.clickedstar : null}
      />
      <FaStar
        onClick={(e) => handleStarClick(e, 1)}
        className={clicked[1] ? styles.clickedstar : null}
      />
      <FaStar
        onClick={(e) => handleStarClick(e, 2)}
        className={clicked[2] ? styles.clickedstar : null}
      />
      <FaStar
        onClick={(e) => handleStarClick(e, 3)}
        className={clicked[3] ? styles.clickedstar : null}
      />
      <FaStar
        onClick={(e) => handleStarClick(e, 4)}
        className={clicked[4] ? styles.clickedstar : null}
      />
    </div>
  </div> 
  )
}
export default Review