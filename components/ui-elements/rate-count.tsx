import { Star } from "lucide-react";
import { Tooltip } from "antd";
import React from "react";

export const RateCount = ({ rate, count }: { rate: number; count: number }) => (
  <div className="flex flex-1 items-center mt-1">
    <Star className="text-orange-600 mr-1" width={16} />{" "}
    <div>
      <span className="font-extrabold">{rate.toFixed(1)}</span>/
      <span className="text-xs">10</span>
      <Tooltip title="Vote Count" className="text-xs">
        <span className="text-xs mx-1 text-blue-400 cursor-pointer">
          ({count})
        </span>
      </Tooltip>
    </div>
  </div>
);
