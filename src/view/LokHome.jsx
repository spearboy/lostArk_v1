// src/view/common/LokHome.jsx
import React, { useState } from 'react';
import { fetchCharacter } from '../api';
import { Unstable_RadarChart as RadarChart } from '@mui/x-charts/RadarChart';

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

    // Radar chart metrics
    const radarMetrics = ['치명', '특화', '신속', '제압', '인내', '숙련'];
    // Parse values and determine max
    const radarValues = data
        ? radarMetrics.map((key) => {
            const stat = data.ArmoryProfile.Stats.find((s) => s.Type === key);
            if (!stat) return 0;
            // Remove non-numeric characters (e.g., '%', commas) for parsing
            const num = parseFloat(stat.Value.replace(/[^0-9.]/g, ''));
            return isNaN(num) ? 0 : num;
        })
        : [];
    const maxValue = radarValues.length ? Math.max(...radarValues) : 100;

    return (
        <div className="char_wrap">
            {/* 검색창 */}
            <div className="char_search">
                <input
                    type="text"
                    placeholder="캐릭터명"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={handleSearch}>조회</button>
            </div>

            {/* 오류 메시지 */}
            {error && <div>{typeof error === 'string' ? error : JSON.stringify(error)}</div>}

            {/* 캐릭터 정보 */}
            {data && (
                <>
                    <div className='char_info_wrap'>
                        <div className='char_info'>
                            <div>캐릭터 레벨: {data.ArmoryProfile.TownLevel}</div>
                            <div>영지: {data.ArmoryProfile.TownName}</div>
                            <div>현재 칭호: {data.ArmoryProfile.Title}</div>
                            <div>길드: {data.ArmoryProfile.GuildName || '없음'}</div>
                            <div>길드 직책: {data.ArmoryProfile.GuildMemberGrade || '없음'}</div>
                        </div>

                        <div className='char_info_png'>
                            <p>마지막 엑세스 아바타</p>
                            <div><img src={data.ArmoryProfile.CharacterImage} alt="Avatar" /></div>
                        </div>
                    </div>
                    <div>

                    </div>

                    <div>
                        <h2>스탯 정보</h2>
                        스킬 포인트: {data.ArmoryProfile.TotalSkillPoint}/{data.ArmoryProfile.UsingSkillPoint}
                        <div className='stat_wrap'>

                            <div>
                                {data.ArmoryProfile.Stats.map((stat) => (
                                    <div key={stat.Type} className='tooltip_wrap'>
                                        <div>{stat.Type}</div>
                                        <div>{stat.Value}</div>
                                        {stat.Tooltip && (
                                            <div className='tooltip'>
                                                {stat.Tooltip.map((t, i) => (
                                                    <div key={i} dangerouslySetInnerHTML={{ __html: t }} />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {radarValues.length > 0 && (
                                <RadarChart
                                    height={300}
                                    series={[{ label: name, data: radarValues }]}
                                    radar={{ metrics: radarMetrics, max: maxValue }}
                                />
                            )}
                        </div>
                    </div>

                    <div>
                        <h2>아바타</h2>
                        {(() => {
                            const grouped = data.ArmoryAvatars.reduce((acc, avatar) => {
                                (acc[avatar.Type] = acc[avatar.Type] || []).push(avatar);
                                return acc;
                            }, {});
                            return Object.entries(grouped).map(([type, list]) => (
                                <div key={type}>
                                    <h3>{type}</h3>
                                    {list.map((avatar) => {
                                        const tip = JSON.parse(avatar.Tooltip.replace(/\r\n/g, ''));
                                        return (
                                            <div key={avatar.Name}>
                                                <div>{avatar.Name} ({avatar.Grade})</div>
                                                <img src={avatar.Icon} alt={avatar.Name} />
                                                <div>
                                                    {Object.keys(tip)
                                                        .filter((k) => k.startsWith('Element_'))
                                                        .map((el) => (
                                                            <div
                                                                key={el}
                                                                dangerouslySetInnerHTML={{ __html: tip[el].value || '' }}
                                                            />
                                                        ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ));
                        })()}
                    </div>
                </>
            )}
        </div>
    );
};

export default LokHome;
