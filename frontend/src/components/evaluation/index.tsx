import React from "react";
import { ThumbsUp, ThumbsDown, MinusCircle } from "lucide-react";

export enum EvaluationCondition {
  Positive = "正",
  Negative = "負",
  Neutral = "中立"
}

export interface EvaluationProps {
  className?: string;
  evaluation: EvaluationCondition;
}

const Evaluation: React.FC<EvaluationProps> = ({
  className = "",
  evaluation
}) => {
  return (
    <div className={className}>
      {evaluation === EvaluationCondition.Positive && (
        <ThumbsUp className="w-6 h-6 text-green-500" />
      )}
      {evaluation === EvaluationCondition.Negative && (
        <ThumbsDown className="w-6 h-6 text-red-500" />
      )}
      {evaluation === EvaluationCondition.Neutral && (
        <MinusCircle className="w-6 h-6 text-gray-500" />
      )}
    </div>
  );
};

export default Evaluation;
