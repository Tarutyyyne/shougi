'use client';

import { useState } from 'react';
import styles from './page.module.css';

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

const pieceName: string[] = ['none', 'Pawn'];

const showCandidateSite = () => {};

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
    [0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  //以下structureClone()というboardの配列を変更する関数
  const [lastCoordinate, setLastCoodinate] = useState([0, 0]);
  const newBoard: number[][] = structuredClone(board);

  const clickHandler = (
    clickX: number,
    clickY: number,
    board: number[][],
    directions: number[][],
  ) => {
    const candidateY: number = clickY - 1; //directions[0][0];
    const candidateX: number = clickX + 0; //directions[0][1];
    const lastY: number = clickY + 1;
    const lastX: number = clickX - 0;
    //空白を押したときは何もしない
    console.log(clickY, clickX);
    console.log(candidateY, candidateX);
    if (board[clickY][clickX] === 0) {
      console.log('stop function');
      return;
      //押したところが候補地だったら
    } else if (board[clickY][clickX] === 2) {
      console.log('before moving piece');
      //歩の場合
      if (board[lastY][lastX] === 1) {
        console.log('move piece');
        newBoard[clickY][clickX] = 1;
        newBoard[lastY][lastX] = 0;
        setBoard(newBoard);
      }
      //押したところが駒だったら
    } else {
      if (board[clickY][clickX] === 1) {
        console.log('select piece');
        console.log(clickY, clickX);
        console.log(candidateY, candidateX);
        newBoard[candidateY][candidateX] = 2;
        setBoard(newBoard);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, clickY) =>
          row.map((color, clickX) => (
            <div
              className={styles.cell}
              key={`${clickX}-${clickY}`}
              onClick={() => clickHandler(clickX, clickY, board, newBoard)}
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
