import { LegacyRef } from 'react'
import './index.css'

//  文本元素，用于替换到场景中
const Text = ({ text, childRef }: { text: string; childRef: LegacyRef<any> }) => {
    return (
        <div className={'text'} ref={childRef}>
            {text}
        </div>
    )
}

export { Text }
