import React from 'react';
import {
    Radar, RadarChart, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis,
    ResponsiveContainer
} from 'recharts';

/**
 * data: [
 *   { metric: '기믹 수행률', value: 80 },
 *   { metric: '공격력',     value: 90 },
 *   { metric: '지원력',     value: 70 },
 *   { metric: '이동기 우선', value: 60 },
 * ]
 */
const StatsRadar = ({ data }) => (
    <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
                name="스탯"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
            />
        </RadarChart>
    </ResponsiveContainer>
);

export default StatsRadar;
