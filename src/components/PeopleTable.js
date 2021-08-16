import { useDispatch, useSelector } from "react-redux";
import { selectPeople } from "../redux/reducers/people/selectors";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import React from "react";
import Pagination from "./Pagination";
import { LOAD_USERS } from "../redux/reducers/people/actions";

export default function PeopleTable() {

    const people = useSelector(selectPeople)
    const dispatch = useDispatch();

    const changePage = newPage => dispatch({
        type: LOAD_USERS,
        payload: {
            page: newPage,
            search: people.search
        }
    })
    return (
        <>
            <h1>Peoples</h1>
            {people.loading ? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>
                                Birth
                            </th>
                            <th>
                                Eye Color
                            </th>
                            <th>
                                Gender
                            </th>
                            <th>
                                Hair Color
                            </th>
                            <th>
                                Height
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {people.data.results.map(character => {
                            return (
                                <tr key={character.name}>
                                    <td>{character.name}</td>
                                    <td>{character.birth_year}</td>
                                    <td>{character.eye_color}</td>
                                    <td>{character.gender}</td>
                                    <td>{character.hair_color}</td>
                                    <td>{character.height}</td>
                                </tr>
                            )
                        })}
                        </tbody>

                    </Table>
                    <Pagination
                    page={people.page}
                    total={people.data.count}
                    onChange={changePage}
                    />
                </>
            )}
        </>
    );
}
