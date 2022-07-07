import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { TimeoutRef } from '@hickorytechnology/ng-refs';

@Component({
  selector: 'hickorytechnology-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  opened = true;
  openedFastToggle = false;
  openedLeftNav = false;
  openedProfile = false;
  fastTogglesRemaining = 0;

  @ViewChild('Profile')
  public $profile!: ElementRef<HTMLDivElement>;

  @HostListener('click', ['$event'])
  public handleAutomaticUserPopoutClose($event: any) {
    const $target = $event?.target;
    const $profile = this.$profile?.nativeElement;
    // If there's no good input or we're
    // not even open, short-circuit.
    if (!$target || !$profile || !this.openedProfile) {
      return;
    }
    // Otherwise close the popout if the
    // click is outside our container.
    if (!$profile.contains($target)) {
      this.openedProfile = false;
    }
  }

  constructor(readonly timeoutRef: TimeoutRef) { }

  public experimentFastToggle(remaining = 50): void {
    this.fastTogglesRemaining = remaining;
    if (!remaining) {
      return;
    }
    this.timeoutRef.nativeSet(() => {
      this.openedFastToggle = !this.openedFastToggle;
      this.experimentFastToggle(--remaining);
    }, 75);
  }

  public openModal(): void {
    this.opened = true;
  }
  public closeModal(): void {
    this.opened = false;
  }
  public toggleLeftNav(): void {
    this.openedLeftNav = !this.openedLeftNav;
  }
  public toggleProfile(): void {
    this.openedProfile = !this.openedProfile;
  }
}
