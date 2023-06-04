import React from "react"
import s from "./header.module.scss"
import { Clocks } from "../../features/"
import { setLocale } from "react-redux-i18n"
import { AppDispatch, RootState } from "store"
import { connect } from "react-redux"
import { CounterState } from "store/slices/review"

export const languages = [
  { code: "en", title: "English" },
  { code: "ru", title: "Russian" },
]

interface IProps {
  dispatch: AppDispatch;
  review: CounterState;
  i18n: any;
}

class Header extends React.Component<IProps> {
  changeLanguage = (lang: string) => {
    this.props.dispatch(setLocale(lang))
  }

  render() {
    return (
      <div className={s.header}>
        <Clocks />
        <div className={s.changeLang}>
          {languages.map((el) => (
            <button
              type="submit"
              key={el.code}
              onClick={() => this.changeLanguage(el.code)}
              disabled={this.props.i18n.locale === el.code}
            >
              {el.title}
            </button>
          ))}
        </div>
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
    dispatch,
  }
}

// export const HeaderTranslated =  withTranslation()(Header)
export const HeaderTranslated = connect(mapStateToProps, mapDispatchToProps)(Header)
