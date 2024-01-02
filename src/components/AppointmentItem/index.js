// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {eachAppDetails, onToggleStar} = props
  const {id, title, date, isStarred} = eachAppDetails
  const isStarredButton = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'

  const onClickStar = () => {
    onToggleStar(id)
  }

  return (
    <li className="list-item">
      <div className="card">
        <p className="title">{title}</p>
        <button
          data-testid="star"
          type="button"
          className="button3"
          onClick={onClickStar}
        >
          <img src={isStarredButton} alt="star" className="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
