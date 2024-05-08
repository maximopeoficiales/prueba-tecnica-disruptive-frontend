import { useSession } from '@/hooks/useSession'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { SearchIcon } from './icons'

const SearchFilter = () => {
  const { setSearchFilter, setThemeSelected, context } = useSession()
  const { themes } = context.state
  const search = ({ target }: any) => setSearchFilter(target.value)
  const selectedTheme = ({ target }: any) => setThemeSelected(target.value)
  return (
    <div className="flex justify-between items-center w-full">
      <Input
        aria-label="Search"
        onChange={search}
        className="w-4/6 block mx-1"
        labelPlacement="outside"
        placeholder="Search..."
        size="lg"
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0 "
            width={20}
            height={20}
          />
        }
        type="search"
      />
      <Select
        size="lg"
        isRequired
        placeholder="Select to role"
        className="w-2/6 my-2"
        onChange={selectedTheme}
      >
        <SelectItem key={'all'} value={'all'} className='capitalize'>
          All
        </SelectItem>
        {themes.map((theme) => (
          <SelectItem key={theme.name} value={theme.name} className='capitalize'>
            {theme.name}
          </SelectItem>
        )) as any}
      </Select>
    </div>
  )
}

export default SearchFilter