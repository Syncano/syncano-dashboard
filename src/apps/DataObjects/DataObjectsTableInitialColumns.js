const DataObjectsTableColumns = [
  {
    id: 'id',
    sortable: true,
    width: 80,
    checked: true
  },
  {
    id: 'revision',
    width: 80,
    checked: true
  },
  {
    id: 'owner',
    width: 80,
    checked: true
  },
  {
    id: 'group',
    width: 80,
    checked: true
  },
  {
    id: 'owner_permissions',
    width: 130,
    checked: true
  },
  {
    id: 'group_permissions',
    width: 130,
    checked: true
  },
  {
    id: 'other_permissions',
    width: 130,
    checked: true
  },
  {
    id: 'channel',
    width: 80,
    checked: false
  },
  {
    id: 'channel_room',
    width: 110,
    checked: false
  },
  {
    id: 'created_at',
    sortable: true,
    width: 120,
    checked: true
  },
  {
    id: 'updated_at',
    sortable: true,
    width: 120,
    checked: true
  }
];

export default DataObjectsTableColumns;
