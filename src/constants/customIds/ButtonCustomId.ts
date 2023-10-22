export const ButtonCustomId = {
  setup: {
    channel: {
      add: 'setup/channel/add',
      edit: 'setup/channel/edit',
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
    add_unit: {
      scoring_name: 'point_unit/add_unit/scoring_name',
      scoring_desc: 'point_unit/add_unit/scoring_desc',
      point_score: 'point_unit/add_unit/point_score',
    },
  },
  settings: 'settings',
  info: {
    point: 'info/point',
    global_point: 'info/global_point',
    user: {
      rank: 'info/user/rank',
    },
  },
} as const;
