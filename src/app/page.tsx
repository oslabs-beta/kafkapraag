"use client"
import { useState, useEffect } from "react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";
import BytesPerMinute from "./components/bytesPerMin";

const Home = () => {


  return (
    <div>
      <div>Home</div>
     <BytesPerMinute/>
    </div>
  )
}

export default Home;