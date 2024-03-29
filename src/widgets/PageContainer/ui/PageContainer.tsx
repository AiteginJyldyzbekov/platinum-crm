import { Button, ThemeButton } from 'shared/ui/Button/Button'
import styles from './PageContainer.module.scss'
import { Link } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'

interface PageContainerProps {
  children: React.ReactNode | string
  createPath?: string
  buttonText?: string
}

const PageContainer: React.FC<PageContainerProps> = (props) => {
  const { children, createPath, buttonText } = props
  return (
        <div className={styles.wrapper}>
            <Link to={createPath}>
                <Button
                    clasName={classNames(styles.addButton, {}, [])}
                    theme={ThemeButton.DEFAULT}
                >
                    {buttonText}
                </Button>
            </Link>
            {children}
        </div>
  )
}
export default PageContainer
