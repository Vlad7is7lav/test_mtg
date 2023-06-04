import React from "react"
import s from "./review.module.scss"

type ItemReview = {
  name?: string;
  review?: string;
  date?: string;
};

interface IReviewProps {
  item: ItemReview;
  name?: string;
  review?: string;
  date?: string;
  refa: React.RefObject<HTMLParagraphElement>;
  height: number;
}

export class Review extends React.Component<IReviewProps> {
  constructor(props: IReviewProps) {
    super(props)
  }
  render() {
    return (
      <div className={s.review}>
        <div className={s.reviewName} ref={this.props.refa}>
          {this.props.item.name}
        </div>
        <div className={s.reviewBlock}>
          <div className={s.reviewtext}>{this.props.item.review}</div>
          <div className={s.reviewDate}>{this.props.item.date} </div>
        </div>
      </div>
    )
  }
}
