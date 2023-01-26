import { FC, memo } from 'react'

interface PopupI {}

const Popup: FC<PopupI> = (props) => {
  return (
    <div>

    </div>
  )
}

Popup.displayName = 'warning popup'
export default memo(Popup)
