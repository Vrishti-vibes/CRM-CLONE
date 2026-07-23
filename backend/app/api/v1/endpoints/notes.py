from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.api import deps
from app.models.note import Note
from app.models.activity import Activity
from app.models.user import User
from app.schemas.note import NoteCreate, NoteResponse, NoteListResponse

router = APIRouter()


@router.get("/deals/{deal_id}/notes", response_model=NoteListResponse)
def get_deal_notes(
    deal_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    notes = db.query(Note).filter(Note.deal_id == deal_id).order_by(Note.id.desc()).all()
    return {"items": notes, "total": len(notes)}


@router.post("/deals/{deal_id}/notes", response_model=NoteResponse, status_code=status.HTTP_201_CREATED)
def create_deal_note(
    deal_id: int,
    *,
    db: Session = Depends(deps.get_db),
    note_in: NoteCreate,
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    note = Note(
        content=note_in.content,
        deal_id=deal_id,
        author_id=current_user.id
    )
    db.add(note)

    # Automatically record activity entry
    activity = Activity(
        title=f"Note added by {current_user.full_name}",
        activity_type="NOTE_ADDED",
        deal_id=deal_id,
        user_id=current_user.id
    )
    db.add(activity)

    db.commit()
    db.refresh(note)
    return note


@router.delete("/notes/{note_id}")
def delete_note(
    note_id: int,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user),
) -> Any:
    note = db.query(Note).filter(Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    db.delete(note)
    db.commit()
    return {"message": "Note removed successfully"}