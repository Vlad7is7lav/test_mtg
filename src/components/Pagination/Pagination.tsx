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
          {this.props.nav &&
            (this.props.nav.total > 4 ? (
              <span className={s.navigation}>
                {this.props.nav.current === 1 ? (
                  <>
                    <span className={s.pageCurrent}> 1 </span>
                    <span className={s.page}> 2 </span>
                  </>
                ) : (
                  <span className={s.page}> 1 </span>
                )}

                {this.props.nav.current > 2 ? <span className={s.page}> ... </span> : null}

                {this.props.nav.current != 1 && this.props.nav.current != this.props.nav.total ? (
                  <span className={s.pageCurrent}> {this.props.nav.current} </span>
                ) : null}

                {this.props.nav.current + 1 < this.props.nav.total ? (
                  <span className={s.page}> ... </span>
                ) : null}

                {this.props.nav.current === this.props.nav.total ? (
                  <span className={s.pageCurrent}> {this.props.nav.total} </span>
                ) : (
                  <span className={s.page}> {this.props.nav.total} </span>
                )}
              </span>
            ) : (
              <span className={s.navigation}>
                {this.props.nav.current} / {this.props.nav.total}
              </span>
            ))}

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
