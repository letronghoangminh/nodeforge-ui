"use client";
import { Label } from "@/components/ui/label";
import { roundToTwoDecimalPlaces } from "@/lib/roundToTwoDecimalPlaces";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface MetricsProps {
  data: {
    cpu: number;
    memory: number;
  };
}

const Metrics = ({ data }: MetricsProps) => {
  return (
    <>
      <div className="flex flex-col gap-4 w-[300px] items-center">
        <Label>CPU</Label>

        <CircularProgressbar
          value={data.cpu}
          maxValue={100}
          minValue={0}
          text={`${roundToTwoDecimalPlaces(data.cpu)}%`}
        />
      </div>
      <div className=" flex flex-col gap-4 w-[300px] items-center">
        <Label>Memory</Label>
        <CircularProgressbar
            
          value={data.memory}
          maxValue={100}
          minValue={0}
          text={`${roundToTwoDecimalPlaces(data.memory)}%`}
          styles={buildStyles({

           
            // Text size
            textSize: '16px',
        
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,
        
            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',
        
            // Colors
            pathColor: `rgba(62, 152, 199)`,
            textColor: '#f88',
            trailColor: '#d6d6d6',
            backgroundColor: '#3e98c7',
          })}
        />
      </div>
    </>
  );
};

export default Metrics;
