"use client"
import { useState, useEffect } from "react";
import { VictoryChart, VictoryLine, VictoryTheme } from "victory";
import BytesPerMinute from "./components/BytesPerSecond";

const Home = () => {

  return (
    <div className="flex justify-center">
      <BytesPerMinute/>
    </div>
  )
}

export default Home;