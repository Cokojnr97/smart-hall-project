import ButtonComponent from '../Button/Button.jsx'
import { useNavigate } from 'react-router-dom'

const CreateResourceButton = () => {
  const navigate = useNavigate()

  return (
    <ButtonComponent
      className="button button-primary"
      type="button"
      onClick={() => navigate('/create-resource')}
    >
      + Create new resource
    </ButtonComponent>
  )
}

export default CreateResourceButton
