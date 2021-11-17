import React, { useState } from 'react';

export function Home() {
  const [count, setCount] = useState(0);
  return (
      <h1 onClick={setCount}>这是一个标题 ${count}</h1>
  );
}

export async function test() {
  const a: string = await "2";
  return a;
}