import { useEffect, useState } from 'react'
import HomePageView from './HomePageView.jsx'

function getWelcomeMessage(date = new Date()) {
  const hour = date.getHours()
  const timeOfDay = hour >= 5 && hour < 12
    ? 'Good morning'
    : hour >= 12 && hour < 18
      ? 'Good afternoon'
      : hour >= 18 && hour < 22
        ? 'Good evening'
        : 'Hello'
  const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)

  return `${timeOfDay}! Happy ${day}!`
}

export default function HomePage() {
  const [welcomeMessage, setWelcomeMessage] = useState(() => getWelcomeMessage())

  useEffect(() => {
    const updateWelcomeMessage = () => setWelcomeMessage(getWelcomeMessage())
    const intervalId = window.setInterval(updateWelcomeMessage, 60_000)

    return () => window.clearInterval(intervalId)
  }, [])

  return <HomePageView welcomeMessage={welcomeMessage} />
}
