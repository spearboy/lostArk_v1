// src/view/common/LokHome.jsx
import React, { useState } from 'react';
import { fetchCharacter } from '../api';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
    Stack,
} from '@mui/material';

const LokHome = () => {
    const [name, setName] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        setError(null);
        try {
            const response = await fetchCharacter(name);
            setData(response.data);
        } catch (err) {
            setError(err.response?.data || err.message);
            setData(null);
        }
    };

    return (
        <>
            <Box p={4}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <TextField
                        label="캐릭터명"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Button variant="contained" onClick={handleSearch}>
                        조회
                    </Button>
                </Stack>
            </Box>

            {data && (
                <>
                    <div>
                        <div>캐릭터 레벨: {data.ArmoryProfile.TownLevel}</div>
                        <div>영지: {data.ArmoryProfile.TownName}</div>
                        <div>현재 칭호: {data.ArmoryProfile.Title}</div>
                        <div>길드: {data.ArmoryProfile.GuildName}</div>
                        <div>길드 직책: {data.ArmoryProfile.GuildMemberGrade}</div>
                    </div>
                    <div>
                        <p>마지막 엑세스 아바타</p>
                        <div><img src={data.ArmoryProfile.CharacterImage} /></div>
                    </div>
                    <div>
                        <div>스킬 포인트: {data.ArmoryProfile.TotalSkillPoint}/{data.ArmoryProfile.UsingSkillPoint}</div>
                    </div>
                </>
            )}
        </>
    );
};

export default LokHome;
