import { Component } from '@angular/core';
import { MATERIAL_DIRECTIVES } from '../shared/libs/angular2-material';

import {
    PANEL2_DIRECTIVES,
    PanelFormControl,
    PanelFormControlTextfield,
    PanelFormControlSelect,
    PanelFormControlTextarea,
    PanelFormControlDragnDrop,
    PanelFormControlFiles
} from '../shared/index';
/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    moduleId: module.id,
    selector: 'jpa-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    directives: [MATERIAL_DIRECTIVES, PANEL2_DIRECTIVES]
})
export class HomeComponent {
    controls: PanelFormControl<any>[];
    model: any = {
        title: 'Bombasto',
        client_id: 2,
        body: '<p>Omfg.</p>',
        tags: [
            { id: 1, name: 'Sweet!' }
        ],
        image: {
          alias: "251577fdbd6e0b971c48f6414de1f404.jpg",
          created_at: "2016-07-05 17:17:19",
          extension: "jpg",
          filename: "251577fdbd6e0b971c48f6414de1f404.jpg",
          id: 57,
          last_modified: "0000-00-00 00:00:00",
          mimetype: "image/jpeg",
          path: "app\public\images\projects",
          size: 9791,
          updated_at: "2016-07-05 17:17:19",
          url: "http://jpapi.localhost/img/projects/251577fdbd6e0b971c48f6414de1f404.jpg",
        },
        images: [
            { id: 1, url: 'http://jpapi.localhost/img/projects/6bc0910593f7c0dc8a8e9a095b9abec4.jpg', name: "6bc0910593f7c0dc8a8e9a095b9abec4.jpg", alias: "6bc0910593f7c0dc8a8e9a095b9abec4.jpg"}
        ]
    };

    constructor() {
        this.controls = [
          // new PanelFormControlTextfield({
          //   name: 'title',
          //   required: true,
          //   order: 3
          // }),
          // new PanelFormControlSelect({
          //     name: 'client_id',
          //     label: 'Client',
          //     required: true,
          //     options: [{
          //         label: 'Adobe',
          //         value: 2
          //     }, {
          //         label: 'Cisco',
          //         value: 3
          //     }]
          // }),
          // new PanelFormControlTextarea({
          //     name: 'body',
          //     required: true,
          //     ckeditor: true
          // }),
          // new PanelFormControlDragnDrop({
          //     name: 'tags',
          //     required: true,
          //     options: [
          //         {
          //             id: 1,
          //             name: 'Sweet!'
          //         },
          //         {
          //             id: 2,
          //             name:'Sweeter!'
          //         },
          //         {
          //             id: 3,
          //             name: 'Cool!'
          //         },
          //         {
          //             id: 4,
          //             name: 'Cooler!'
          //         }
          //     ]
          // }),
          // new PanelFormControlFiles({
          //     name: 'pdf',
          //     required: true,
          //     multiple: false,
          // }),
          new PanelFormControlFiles({
              name: 'image',
              required: false,
              multiple: false,
              type: 'image'
          }),
          // new PanelFormControlFiles({
          //     name: 'images',
          //     required: true,
          //     filesLabel: 'images in gallery',
          //     type: 'image'
          // })
        ];
    }
}
