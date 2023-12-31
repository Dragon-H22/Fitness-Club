
import React, { useContext } from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { Box, Typography } from '@mui/material'
import BodyPart from './../BodyPart/BodyPart';
import RightArrowIcon from '../../assets/icons/right-arrow.png'
import LeftArrowIcon from '../../assets/icons/left-arrow.png'
import ExerciseCard from '../ExerciseCard/ExerciseCard.jsx';


const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext);

    return <Typography onClick={() => scrollPrev()} className='right-arrow'>
        <img src={LeftArrowIcon} alt="left-arrow" />
    </Typography>

}


const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext);

    return <Typography onClick={() => scrollNext()} className='left-arrow'>
        <img src={RightArrowIcon} alt="right-arrow" />
    </Typography>

}


export default function HorizontalScrollbar({ data, bodyPart, setBodyPart }) {
    return (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {data.map((item) => (
                <Box
                    key={item.id || item}
                    itemId={item.id || item}
                    title={item.id || item}
                    m='0 40px'>
                    {bodyPart? <BodyPart item={item} bodyPart={bodyPart} setBodyPart={setBodyPart} />: <ExerciseCard exercise={item}/> }
                </Box>
            ))}
        </ScrollMenu>
    )
}

