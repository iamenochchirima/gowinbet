import { forwardRef, ElementType } from 'react'
import classNames from 'classnames'
import { CommonProps } from '@/@types/common'

interface ContainerProps extends CommonProps {
    asElement?: ElementType
}

const Container = forwardRef((props: ContainerProps, ref) => {
    const { className, children, asElement: Component = 'div', ...rest } = props

    return (
        <Component
        >
            {children}
        </Component>
    )
})

Container.displayName = 'Container'

export default Container
