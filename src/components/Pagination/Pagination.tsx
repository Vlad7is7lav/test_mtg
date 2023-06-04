import React from "react"
import s from "./pagination.module.scss"

interface IPaginationProps {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  disable: {
    prev: boolean;
    next: boolean;
  };
  nav?: {
    current: number;
    total: number;
  };
}

export class Pagination extends React.Component<IPaginationProps> {
  constructor(props: IPaginationProps) {
    super(props)
  }
  render() {
    return (
      <>
        <div className={s.pagination}>
          <button
            type="button"
            onClick={this.props.onPrevPageClick}
            className={s.prevArrow}
            disabled={this.props.disable.prev}
          >
            {"<"}
          </button>
          {this.props.nav && (
            <span className={s.navigation}>
              {this.props.nav.current} / {this.props.nav.total}
            </span>
          )}

          <button
            type="button"
            onClick={this.props.onNextPageClick}
            className={s.nextArrow}
            disabled={this.props.disable.next}
          >
            {">"}
          </button>
        </div>
      </>
    )
  }
}
