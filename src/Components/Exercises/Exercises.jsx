import { Box, Pagination, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ExerciseCard from '../ExerciseCard/ExerciseCard.jsx'
import { exerciseOptions, fetchData } from '../../utils/fertchData.js';
import Loader from '../Loader/Loader.jsx';


export default function Exercises({ exercises, setExercises, bodyPart }) {

    const [currentPage, setCurrentPage] = useState(1);

    const exercisesPerPage = 9;
    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    const currentExercises = exercises?.slice(indexOfFirstExercise, indexOfLastExercise);

    const paginae = (e, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 1800, behavior: 'smooth' })
    }

    
    useEffect(() => {
        const fetchExercisesData = async () => {
            let exercisesData = [];
            if (bodyPart === 'all') {
                exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
            } else {
                exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
            }
            setExercises(exercisesData);
        }
        fetchExercisesData();
    }, [bodyPart]);

    if(!currentExercises.length) return <Loader />
    
    return <>
        <Box id='exercises'
            sx={{ mt: { lg: '110px' } }}
            mt='50px'
            p='20px'
        >
            <Typography variant='h3' mb='46px'>
                Showing Results
            </Typography>
            <Stack direction='row' sx={{ gap: { lg: '110px', xs: '50px' } }} flexWrap='wrap' justifyContent='center'>
                {currentExercises.map((exercise, index) => (
                    <ExerciseCard key={index} exercise={exercise} />
                ))}
            </Stack>
            <Stack mt='100px' alignItems='center'>
                {exercises.length > 9 && (
                    <Pagination
                        color='standard'
                        shape='rounded'
                        defaultPage={1}
                        count={Math.ceil(exercises.length / exercisesPerPage)}
                        page={currentPage}
                        onChange={paginae}
                        size='large'
                    />
                )}
            </Stack>
        </Box>
    </>
}
