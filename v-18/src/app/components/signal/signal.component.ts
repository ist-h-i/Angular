import { Component, NgZone, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * SignalComponent
 *
 * @description
 *  - signalという名前のSignalを生成
 *  - inputイベントが発生した場合、Signalの値を変更
 *  - Signalの値を表示
 *
 * @remarks
 *  - NgZoneをinject
 *  - signalは、UIの更新を伴う
 */
@Component({
  selector: 'app-signal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signal.component.html',
  styleUrl: './signal.component.scss'
})
export class SignalComponent {
  // signal
  signal = signal('');

  // NgZone（zonelessの場合は不要）
  // private zone: NgZone;

  /**
   * inputイベント
   *
   * @description
   *  - inputイベントが発生した場合、Signalの値を変更
   *  - NgZone.runを使用して、Signalの値を変更
   * @param event inputイベント
   */
  changeInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    // NgZone.runを使用して、Signalの値を変更（zonelessの場合は不要）
    // this.zone.run(() => {
      this.signal.set(inputElement.value);
    // })
  }

  // /**
  //  * Constructor
  //  *
  //  * @description
  //  *  - NgZoneをinject（zonelessの場合は不要）
  //  */
  // constructor(zone: NgZone) {
  //   this.zone = zone;
  // }
}
