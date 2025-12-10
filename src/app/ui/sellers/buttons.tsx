import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteItem } from '@/app/lib/actions';


export function DeleteItem({ id }: { id: number }) {
  const deleteItemWithId = deleteItem.bind(null, id);

  return (
    <form action={deleteItemWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="trashSymbol" />
      </button>
    </form>
  );

}