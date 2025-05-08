'use client';

import { useState } from 'react';
import styles from './page.module.css';

type Coordinate = {
  y: number;
  x: number;
};

const directions = [
  [-1, 0], //上
  [-1, 1], //右上
  [0, 1], //右
  [1, 1], //右下
  [1, 0], //下
  [1, -1], //左下
  [0, -1], //左
  [-1, -1], //左上
];

//============以下home====================================
export default function Home() {
  const [turn, setTurn] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  //以下structureClone()というboardの配列を変更する関数
  const [lastCoordinate, setLastCoodinate] = useState([0, 0]);
  const newBoard: number[][] = structuredClone(board);

  const [currentClick, setCurrentClick] = useState<number[] | null>(null);
  const [lastClick, setLastClick] = useState<number[] | null>(null);

  const clickHandler = (
    clickY: number,
    clickX: number,
    board: number[][] | null,
    newBoard: number[][],
    directions: number[][],
    currentClick: number[] | null,
    lastClick: number[] | null,
  ) => {
    setCurrentClick([clickY, clickX]);
    setLastClick(currentClick);
    const candidateY: number = clickY + directions[0][0]; //;
    const candidateX: number = clickX + directions[0][1]; //directions[0][1];
    const lastY: number = clickY - directions[0][0];
    const lastX: number = clickX - directions[0][1];
    //空白を押したときは何もしない
    console.log('currentClick', currentClick);
    console.log('lastClick', lastClick);
    if (board[currentClick[0]][currentClick[1]] === 0) {
      return;
      //押したところが候補地だったら
    } else if (board[currentClick[0]][currentClick[1]] === 2) {
      //歩の場合
      if (board[lastClick[0]][lastClick[1]] === 1) {
        newBoard[clickY][clickX] = 1;
        newBoard[lastY][lastX] = 0;
        console.log('last coordinate');
      }
      //押したところが駒だったら
    } else {
      if (board[currentClick[0]][currentClick[1]] === 1) {
        console.log('select piece');
        newBoard[candidateY][candidateX] = 2;
      }
    }
    setBoard(newBoard);
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, clickY) =>
          row.map((color, clickX) => (
            <div
              className={styles.cell}
              key={`${clickX}-${clickY}`}
              onClick={() =>
                clickHandler(clickY, clickX, board, newBoard, directions, currentClick, lastClick)
              }
            >
              {color !== 0 && (
                <div
                  className={styles.piece}
                  style={{ background: color === 1 ? '#000' : '#f00' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
}
