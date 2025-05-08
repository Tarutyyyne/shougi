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

const deleteCandidate = (board: number[][], newBoard: number[][]) => {
  for (let i = 0; i < 81; i++) {
    const deleteY: number = i % 9;
    const deleteX: number = Math.floor(i / 9);
    if (board[deleteY][deleteX] === 2) {
      newBoard[deleteY][deleteX] = 0;
    }
  }
};
//#TODO文字を入力するとそれに対応した数値を返してくれる関数を作る

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
  const newBoard: number[][] = structuredClone(board);

  const [lastClick, setLastClick] = useState<number[] | null>(null);

  const clickHandler = (
    clickY: number,
    clickX: number,
    board: number[][],
    newBoard: number[][],
    directions: number[][],
    // currentClick: number[] | null,
    // lastClick: number[] | null,
  ) => {
    const candidateY: number = clickY + directions[0][0]; //;
    const candidateX: number = clickX + directions[0][1]; //directions[0][1];

    // console.log('lastClick', lastClick);
    // if (board[clickY][clickX] === 0) {
    //   return;
    //   //押したところが候補地だったら
    // }
    // if (board[clickY][clickX] === 2) {
    //   //歩の場合
    //   if (board[lastClick[0]][lastClick[1]] === 1) {
    //     newBoard[clickY][clickX] = 1;
    //     newBoard[lastClick[0]][lastClick[1]] = 0;
    //     console.log('last coordinate');
    //   }
    //   //押したところが駒だったら
    // } else {
    //   deleteCandidate(board, newBoard);
    //   if (board[clickY][clickX] === 1) {
    //     console.log('select piece');
    //     newBoard[candidateY][candidateX] = 2;
    //   }
    // }

    //空白を押したときは何もしない
    if (board[clickY][clickX] === 0) {
      console.log('vacant');
      deleteCandidate(board, newBoard);
    }
    //候補地を押したとき
    if (board[clickY][clickX] === 2) {
      console.log('click candidate');
      //
      if (board[lastClick[0]][lastClick[1]] === 1) {
        newBoard[clickY][clickX] = 1;
        newBoard[lastClick[0]][lastClick[1]] = 0;
      }
    }
    //駒を押したとき
    if (board[clickY][clickX] === 1) {
      console.log('click piece');
      deleteCandidate(board, newBoard);
      if (board[clickY][clickX] === 1) {
        console.log('select piece');
        newBoard[candidateY][candidateX] = 2;
        setLastClick([clickY, clickX]);
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
              onClick={() => clickHandler(clickY, clickX, board, newBoard, directions)}
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
