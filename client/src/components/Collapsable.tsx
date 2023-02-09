import { useState } from 'react'
import styles from '../style/rules.module.css'
import { SlArrowUp } from 'react-icons/sl'
import { motion, AnimatePresence } from 'framer-motion'

interface CollapsableProps {
    label: string
    children: React.ReactNode
}

interface WrapperProps {
    children: React.ReactNode
}

const RulesWrapper = ({ children }: WrapperProps) => {
    return (
        <div className={styles.rulesWrapper}>
            {children}
        </div>
    )
}

const Collapsable = ({ label, children }: CollapsableProps) => {
    const [open, setOpen] = useState(false)

    const toggle = () => {
        setOpen(!open);
    };

    return (
        <RulesWrapper>
            <h2 className={styles.drawer} onClick={toggle}>
                {label}
                <motion.div
                    animate={{ rotate: open ? 0 : 180 }}
                    transition={{ duration: 0.2 }}
                >
                    <SlArrowUp />
                </motion.div>
            </h2>
            <AnimatePresence>
            {
                open &&
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {children}
                    </motion.div>
            }
            </AnimatePresence>
        </RulesWrapper>
    )
}

export default Collapsable