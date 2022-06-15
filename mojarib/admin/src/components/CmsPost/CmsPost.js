import Link from "next/link"
import React, {useEffect, useState} from "react"
import {Button, Card, Form} from "react-bootstrap"
import useWindowSize from "../../hooks/useWindowSize"
import CardHeaderMore from "../CardHeaderMore"
import Image from "../CustomImage"
import DataTable from "./DataTable"

export default function LatestPosts({items, defaultPageSize, header}) {
    const [hiddenColumns, setHiddenColumns] = useState([])
    const viewportSize = useWindowSize()

    useEffect(() => {
        if (viewportSize.width < 600) {
            setHiddenColumns(["title", "created_at"])
        } else if (viewportSize.width < 900) {
            setHiddenColumns(["title", "created_at"])
        } else {
            setHiddenColumns([])
        }
    }, [viewportSize.width])
    const columns = React.useMemo(
        () => [
            {
                accessor: "checked",
                disableSortBy: true,
                Cell: () => {
                    const [checked, setChecked] = useState(false)
                    return (
                        <Form.Check
                            type="checkbox"
                            checked={checked}
                            onChange={() => setChecked(!checked)}
                        />
                    )
                },
            },
            {
                Header: "Title",
                accessor: "title",
                Cell: ({cell: {value}, row: {original}}) => {
                    return (
                        <Link href={original.id}>
                            <a className="text-reset text-decoration-none d-flex align-items-center">
                                <span className="me-3">
                                  <Image
                                      className="img-fluid rounded"
                                      src={original.image}
                                      alt={value}
                                      width={75}
                                      height={50}
                                      layout="fixed"
                                      objectFit="cover"
                                  />
                                </span>
                                <strong>{value}</strong>
                            </a>
                        </Link>
                    )
                },
            },
            {
                Header: "Author",
                accessor: "author",
            },
            {
                Header: "Created Time",
                accessor: "created_at"
            },
        ],
        [hiddenColumns]
    )

    return (
        <Card className="card-table mb-4 mb-lg-0">
            {header && (
                <Card.Header>
                    <h5 className="card-heading">{header}</h5>
                    <CardHeaderMore/>
                </Card.Header>
            )}
            <DataTable
                columns={columns}
                items={items}
                hiddenColumns={hiddenColumns}
                defaultPageSize={defaultPageSize}
            />
        </Card>
    )
}
