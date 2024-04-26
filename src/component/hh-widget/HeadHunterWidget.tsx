'use client'
import { HeadHunterService } from "@/service/hh-widget/HeadHunterService";
import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Pagination from "@mui/material/Pagination/Pagination";
import { useEffect, useState } from "react";

import style from "./headHunterWidget.module.scss"

export default function HeadHunterWidget() {
    const onClick = async (page : number) => {
        setIsLoading(true); 
        const response = (await HeadHunterService.vacancies(page, text));
        setIsLoading(false);
        setPages(response?.pages-1)
        setItems(response?.items)

        setRegions(new Set());
        response?.items.forEach((item:any) => {
            regions.add(item?.area?.name);
        })
        console.log()
    }

    const [pages, setPages] = useState(0);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [text, setText] = useState("");
    const [regions, setRegions] = useState(new Set());

    useEffect(() => {
        const fetchData = async () => {
            await onClick(1); 
        };
        fetchData();
    }, []);

      
    return <div className={style.widget}>
        <div className={style.logo}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/79/HeadHunter_logo.png" alt="" />
            <div>Head Hunter Widget</div>
        </div>
        <div className={style.search}>
            <input
                name="search"
                placeholder="Поиск вакансий"
                value={text}
                onChange={e => setText(e.target.value)} 
            />
            <button onClick={() => onClick(0)}>Поиск</button>
        </div>
        <div className={style.content}>
            {isLoading 
                ? <CircularProgress className={style.preloader}/>
                : (
                    <>
                        {items.map((item) => <a className={style.card} key={item.id} href={item?.alternate_url}>
                                <div>
                                    <div className={style.name}>{item.name}</div>
                                    <div className={style.salaryAndExperiens}>
                                        <div className={style.salary}>
                                            {item.salary?.from != undefined && <div>От {item.salary?.from}</div>}
                                            {item.salary?.to != undefined && <div>До {item.salary?.to}</div>}
                                            {(item.salary?.from != undefined || item.salary?.to != undefined) && <div>{item.salary?.currency}</div>}
                                        </div>
                                        
                                        <div className={style.experience}>{item?.experience?.name}</div>
                                    </div>
    
                                    <div className={style.area}>{item.area?.name}</div>
                                    <a  className={style.employer} href={`https://novosibirsk.hh.ru/employer/${item.employer?.id}`}>{item.employer?.name}</a>
                                </div>
                                <div className={style.logo}>
                                    <img src={item.employer?.logo_urls?.original} alt="" />
                                </div>
                            </a>
                        )}
                    </>
                ) 
            }
        </div>
            
        <div className={style.pagination}>
            <Pagination
                count={pages}
                shape="rounded"
                onChange={(event: React.ChangeEvent, page: number) => onClick(page)} 
            />
        </div>
    </div>
  }
  