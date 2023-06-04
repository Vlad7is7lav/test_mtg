import React from "react"
import s from "./main.module.scss"
import { Review } from "../../features"
import { connect } from "react-redux"
import { CounterState, decreasePage, increasePage } from "../../store/slices/review"
import { AppDispatch, RootState } from "../../store/index"
import { Pagination } from "../index"

export const languages = [
  { code: "en", title: "English" },
  { code: "ru", title: "Russian" },
]

interface IProps {
  review: CounterState;
  i18n: any;
  increasePage: () => void;
  decreasePage: () => void;
}

interface IState {
  show: boolean;
}

const ROWS_PER_PAGE = 10

class Main extends React.Component<IProps, IState> {
  private mainRefs: React.RefObject<HTMLParagraphElement>[]
  private height: number
  constructor(props: IProps) {
    super(props)
    this.mainRefs = Array.from(Array(ROWS_PER_PAGE), () => React.createRef())
    this.height = 0
    this.state = { show: true }
    this.handleReviewUnmount = this.handleReviewUnmount.bind(this)
  }

  handleNextPageClick = (): void => {
    this.props.increasePage()
    this.handleReviewUnmount()
  }
  handlePrevPageClick = (): void => {
    this.props.decreasePage()
    this.handleReviewUnmount()
  }

  getTotalPagesAmount = (items: number): number => {
    return Math.ceil(items / ROWS_PER_PAGE)
  }

  getMaxItemHeight = (): void => {
    this.mainRefs.forEach((el) => {
      el.current?.clientHeight != undefined
        ? this.height == 0
          ? (this.height = el.current?.clientHeight)
          : el.current?.clientHeight > this.height
          ? (this.height = el.current?.clientHeight)
          : null
        : null
    })
  }

  setMaxItemHeight = (): void => {
    this.mainRefs.forEach((el) => {
      if (el.current != undefined) {
        el.current.style.height = `${this.height + 20}px`
      }
    })
  }

  componentDidMount(): void {
    this.getMaxItemHeight()
    this.setMaxItemHeight()
  }

  componentDidUpdate(prevProps: IProps, prevState: IState): void {
    if (this.props.review.pageNumber != prevProps.review.pageNumber || prevState.show != this.state.show) {
      this.setState({ show: true })
      this.height = 20
      this.getMaxItemHeight()
      this.setMaxItemHeight()
      console.log(this.height)
    }
  }

  handleReviewUnmount() {
    this.setState({ show: false })
  }

  render() {
    const { review, i18n } = this.props
    let items: number = ROWS_PER_PAGE
    if (review.pageNumber === this.getTotalPagesAmount(review.totalReviews)) {
      items = review.totalReviews - (review.pageNumber - 1) * items
    }
    return (
      <div className={s.wrapper}>
        <div>
          <div className={s.main}>
            {this.state.show &&
              Array.from(Array(items), () => 0).map((el, i) => {
                return (
                  <Review
                    refa={this.mainRefs[i]}
                    height={this.height}
                    key={i}
                    item={i18n.translations[i18n.locale][`client_${i + 1 + 10 * (review.pageNumber - 1)}`]}
                  />
                )
              })}
          </div>
        </div>
        <Pagination
          onNextPageClick={this.handleNextPageClick}
          onPrevPageClick={this.handlePrevPageClick}
          disable={{
            prev: review.pageNumber === 1,
            next: review.pageNumber === this.getTotalPagesAmount(review.totalReviews),
          }}
          nav={{ current: review.pageNumber, total: this.getTotalPagesAmount(review.totalReviews) }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  review: state.review,
  i18n: state.i18n,
})
const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    increasePage: () => dispatch(increasePage()),
    decreasePage: () => dispatch(decreasePage()),
    dispatch,
  }
}

export const MainTranslated = connect(mapStateToProps, mapDispatchToProps)(Main)
