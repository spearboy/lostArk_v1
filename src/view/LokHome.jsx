import React, { useState } from 'react';
import { fetchCharacter } from '../api';

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
        <div>
            {/* 검색창 */}
            <div>
                <input
                    type="text"
                    placeholder="캐릭터명"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={handleSearch}>
                    조회
                </button>
            </div>

            {/* 오류 메시지 */}
            {error && (
                <div>
                    {typeof error === 'string' ? error : JSON.stringify(error)}
                </div>
            )}

            {/* 캐릭터 정보 */}
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
                        <img src={data.ArmoryProfile.CharacterImage} alt="Avatar" />
                    </div>

                    <div>
                        스킬 포인트: {data.ArmoryProfile.TotalSkillPoint}/{data.ArmoryProfile.UsingSkillPoint}
                    </div>

                    <div>
                        <h2>스탯 정보</h2>
                        <div>
                            {data.ArmoryProfile.Stats.map((stat) => (
                                <div key={stat.Type}>
                                    <div>{stat.Type}</div>
                                    <div>{stat.Value}</div>
                                    <div>
                                        {stat.Tooltip.map((t, i) => (
                                            <div key={i} dangerouslySetInnerHTML={{ __html: t }} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default LokHome;
