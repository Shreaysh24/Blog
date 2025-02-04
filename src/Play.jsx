import React from 'react'
import { motion } from 'motion/react'

function Play() {
    return (
        <>
            <motion.div animate={{ x: 100, y: 100, scale: 2 }} className='w-20 h-20 bg-red-50'>
                Play1
            </motion.div>

            {/* With Transition */}
            <motion.div
                initial={{x:0,y:0}}
                animate={{ x: 1000, y: 100, scale: 2, rotate: 100 }}
                transition={{ delay: 1, duration: 5 }}
                className='w-20 h-20 bg-red-50'
            >
                Play2
            </motion.div>

            {/* Key frame Animation */}
            
            <motion.div
                animate={{ 
                    x: [10,220,220,10], 
                    y: [10,10,330,330,10], 
                    scale: [0.9,1.3,1.5,.8], 
                    rotate: [10,120,620,30] }}
                transition={{ delay: 1, duration: 5 }}
                className='w-20 h-20 bg-red-50'
            >
                Play3
            </motion.div>
        </>
    )
}

export default Play