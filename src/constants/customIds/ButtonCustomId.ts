export const ButtonCustomId = {
  setup: {
    admin_channel: {
      add: 'setup/admin_channel/add',
      edit: 'setup/admin_channel/edit',
    },
    log_channel: {
      add: 'setup/log_channel/add',
      edit: 'setup/log_channel/edit',
    },
    info_channel: {
      add: 'setup/info_channel/add',
      edit: 'setup/info_channel/edit',
    },
    point_channel: {
      add: 'setup/point_channel/add',
      edit: 'setup/point_channel/edit',
    },
    point_period: {
      add: 'setup/point_period/add',
      edit: 'setup/point_period/edit',
    },
    start: 'setup/start',
    done: 'setup/done',
  },
  point_unit: {
    add: 'point_unit/add',
    edit: 'point_unit/edit',
  },
  settings: 'settings',

  info: {
    point: 'info/point',
  },
} as const;
