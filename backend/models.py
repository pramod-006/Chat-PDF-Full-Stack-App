from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from database import Base

class Document(Base):
    __tablename__ = "documents"
    __table_args__ = {'extend_existing': True}
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, unique=True, index=True)
    content = Column(String)  
    upload_date = Column(DateTime, default=datetime.utcnow)
