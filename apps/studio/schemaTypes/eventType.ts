import { defineField, defineType} from 'sanity';
import {CalendarIcon} from '@sanity/icons'
import { DoorsOpenInput } from './components/DoorsOpenInput';

export const eventType = defineType({
  name: 'event',
  title: 'Event',
  icon: CalendarIcon,
  type: 'document',
  groups: [
    {
      name: 'details', title: 'Details'
    },
    {name: 'editorial', title: 'Editorial'},
  ],
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      group: 'details',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name'
      },
      validation: (rule) => rule.required().error('Required to generate a page on the website.'),
      hidden: ({document}) => !document?.name,
      group: 'details',
      readOnly: ({value, currentUser}) => {
    // Anyone can set the initial slug
    if (!value) {
      return false
    }

    const isAdmin = currentUser?.roles.some((role) => role.name === 'administrator')

    // Only admins can change the slug
    return !isAdmin
  },
    }),
    // Replace "eventType" in the array of fields:
    defineField({
      name: 'eventType',
      type: 'string',
      options: {
        list: ['in-person', 'virtual'],
        layout: 'radio',
      },
      group: 'details',
    }),
    defineField({
      name: 'date',
      type: 'datetime',
            group: 'details',

    }),
    defineField({
      name: 'doorsOpen',
      type: 'number',
      description: 'Number of minutes before the start time for admission',
      initialValue: 60,
      group: 'details',
      components: {
        input: DoorsOpenInput
      }

    }),
    defineField({
      name: 'venue',
      type: 'reference',
      readOnly: ({value, document }) => !value && document?.eventType === 'virtual',
      to: [{
        type: 'venue'
      }],
      validation: (rule) => rule.custom((value, context) => {
        if (value && context?.document?.eventType === 'virtual') {
          return 'Only in-person events can have a venue'
        }

        return true;
      }),
                  group: 'details',

    }),
    defineField({
      name: 'headline',
        type: 'reference',
        to: [{
          type: 'artist'
        }],
                    group: 'details',

    }),
    defineField({
      name: 'image',
      type: 'image',
                  group: 'editorial',

    }),
    defineField({
      name: 'details',
      type: 'array',
      of: [
        {
          type: 'block'
        }
      ],
                  group: 'editorial',

    }),
    defineField({
      name: 'tickets',
      type: 'url',
      group: 'details',
    })
  ],
  // After the "fields" array
preview: {
  select: {
    name: 'name',
    venue: 'venue.name',
    artist: 'headline.name',
    date: 'date',
    image: 'image',
  },
  prepare({
    name, venue, artist, date, image
  }) {
    const nameFormatted = name || 'Untitled event';
    const dateFormatted = date ? new Date(date).toLocaleDateString(undefined, {
       month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
    }) : '';

     return {
      title: artist ? `${nameFormatted} (${artist})` : nameFormatted,
      subtitle: venue ? `${dateFormatted} @ ${venue}` : dateFormatted,
      media: image || CalendarIcon,
    }
  }
},
})