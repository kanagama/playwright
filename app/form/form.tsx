'use client';

import {useState, useCallback, useRef} from 'react';

export function ShuffleMemberForm() {
    // 結果
    const [result, setResult] = useState([] as string[]);

    // 要素の参照
    const firstRef = useRef<HTMLInputElement>(null);
    const secondRef = useRef<HTMLInputElement>(null);
    const thirdRef = useRef<HTMLInputElement>(null);

    // 通信
    const callApi = useCallback(async () => {
        const members = [] as string[];
        const refs = [firstRef, secondRef, thirdRef];
        for (const ref of refs) {
            if (ref.current?.value) {
                members.push(ref.current?.value);
            }
        }

        const res = await fetch('/api/suffle', {
            method: 'post',
            body: JSON.stringify({members}),
        });

        if (res.ok) {
            const result = await res.json() as {members: string[]};
            setResult(result.members);
        }
    }, []);

    return (
        <>
            <label htmlFor="first">一人目:</label>
            <input type="text" ref={firstRef} id="first" name="first" placeholder='１人目の名前を入力' /><br />
            <label htmlFor="second">二人目:</label>
            <input type="text" ref={secondRef} id="second" name="second" placeholder='２人目の名前を入力' /><br />
            <label htmlFor="third">三人目:</label>
            <input type="text" ref={thirdRef} id="third" name="third" placeholder='３人目の名前を入力' /><br />
            <button onClick={callApi}>シャッフル</button><br />
            <label htmlFor="result">結果</label>
            <output id="result" htmlFor="first second third fourth">{result.join('→')}</output>
        </>
    );
}