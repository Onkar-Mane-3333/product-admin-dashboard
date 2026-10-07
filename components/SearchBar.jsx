export default function SearchBar({ setSearch }) {
    return (
    <input
    type="text"
    placeholder="Search Products"
    onChange={(event) => setSearch(event.target.value)}
    />
    )
}