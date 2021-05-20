import React, { useRef, useState, useEffect } from 'react'
// import { Link } from 'react-router-dom';
import { useSpring, a } from '@react-spring/web'
import useMeasure from 'react-use-measure'
import { Container, Title, Frame, Content, toggle } from './styles'
import * as Icons from './icons'
import { Link } from 'react-router-dom'


function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  useEffect(() => void (ref.current = value), [value])
  return ref.current
}

interface TreeProp{
  defaultOpen?: boolean;
  name: string | JSX.Element;
}

const Tree = React.memo<React.HTMLAttributes<HTMLDivElement> & TreeProp>
(({ children, name, style, defaultOpen = false }) => {
  const [isOpen, setOpen] = useState(defaultOpen)
  const previous = usePrevious(isOpen)
  const [ref, { height: viewHeight }] = useMeasure()
  const { height, opacity, y } = useSpring({
    from: { height: 0, opacity: 0, y: 0 },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      y: isOpen ? 0 : 20,
    },
  })
  // @ts-ignore
  const Icon = Icons[`${children ? (isOpen ? 'Minus' : 'Plus') : 'Close'}SquareO`]
  return (
    <Frame>
      <Icon style={{ ...toggle, opacity: children ? 1 : 0.3 }} onClick={() => setOpen(!isOpen)} />
      <Title style={style}>{name}</Title>
      <Content
        style={{
          opacity,
          height: isOpen && previous === isOpen ? 'auto' : height,
        }}>
        <a.div ref={ref} style={{ y }} children={children} />
      </Content>
    </Frame>
  )
})

export default function Home() {
  return (
    <Container>
      <Tree name="🥑 Yongwook Lee" defaultOpen>
        <Tree name="Introduction" />
        <Tree name="react-spring" >
          <Link to="/react-spring/Card">
            <Tree name="Card"/>
          </Link>
        </Tree>
        <Tree name="react-spring" >
          <Link to="/react-spring/Card">
            <Tree name="Card"/>
          </Link>
        </Tree>
        <Tree name="react-spring" >
          <Link to="/react-spring/Card">
            <Tree name="Card"/>
          </Link>
        </Tree>
      </Tree>
    </Container>
  )
}

