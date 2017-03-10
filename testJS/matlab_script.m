%tot_time=phuong1experiment(:,3);
vector_x=sbj63(:,4);
vector_y=sbj63(:,5);
dimension=length(vector_x);
%diff_time=[tot_time(1); tot_time(2:dimension)-tot_time(1:dimension-1)];
event=sbj63(:,1);

box=[];
for i=1:dimension
    try
    x=vector_x(i);
    y=vector_y(i);
    
% 4 boxes
if (x>140) & (x<540) & (y>0) & (y<365)
    box(i,1)=1;
end
if (x>1200) & (x<1600) & (y>0) & (y<365)
    box(i,1)=2;
end

if (x>140) & (x<540) & (y>580) & (y<945)
    box(i,1)=3;
end
if (x>1200) & (x<1600) & (y>580) & (y<945)
    box(i,1)=4;
end

% 9 boxes
if (x>150) & (x<450) & (y>0) & (y<280)
    box(i,2)=1;
end
if (x>740) & (x<1140) & (y>0) & (y<280)
    box(i,2)=2;
end
if (x>1290) & (x<1590) & (y>0) & (y<280)
    box(i,2)=3;
end

if (x>150) & (x<450) & (y>325) & (y<605)
    box(i,2)=4;
end
if (x>740) & (x<1140) & (y>325) & (y<605)
    box(i,2)=5;
end
if (x>1290) & (x<1590) & (y>325) & (y<605)
    box(i,2)=6;
end

if (x>150) & (x<450) & (y>650) & (y<930)
    box(i,2)=7;
end
if (x>740) & (x<1140) & (y>650) & (y<930)
    box(i,2)=8;
end
if (x>1290) & (x<1590) & (y>650) & (y<930)
    box(i,2)=9;
end

% 16 boxes
if (x>125) & (x<360) & (y>0) & (y<225)
    box(i,3)=1;
end
if (x>545) & (x<780) & (y>0) & (y<225)
    box(i,3)=2;
end
if (x>965) & (x<1190) & (y>0) & (y<225)
    box(i,3)=3;
end
if (x>1380) & (x<1605) & (y>0) & (y<225)
    box(i,3)=4;
end

if (x>125) & (x<360) & (y>230) & (y<455)
    box(i,3)=5;
end
if (x>545) & (x<780) & (y>230) & (y<455)
    box(i,3)=6;
end
if (x>965) & (x<1190) & (y>230) & (y<455)
    box(i,3)=7;
end
if (x>1380) & (x<1605) & (y>230) & (y<455)
    box(i,3)=8;
end

if (x>125) & (x<360) & (y>475) & (y<700)
    box(i,3)=9;
end
if (x>545) & (x<780) & (y>475) & (y<700)
    box(i,3)=10;
end
if (x>965) & (x<1190) & (y>475) & (y<700)
    box(i,3)=11;
end
if (x>1380) & (x<1605) & (y>475) & (y<700)
    box(i,3)=12;
end

if (x>125) & (x<360) & (y>725) & (y<950)
    box(i,3)=13;
end
if (x>545) & (x<780) & (y>725) & (y<950)
    box(i,3)=14;
end
if (x>965) & (x<1190) & (y>725) & (y<950)
    box(i,3)=15;
end
if (x>1380) & (x<1605) & (y>725) & (y<950)
    box(i,3)=16;
end


    end
end

flag=0;
fixation=[];
boxes=[];
boxes_01=[];
save_choice=[];
rating=[];

for i=1:dimension
    
    n=event(i);
    if (isnan(n)-1)    
        trial=floor(n/10)+1; %integer
        nblocks=mod(trial,3); %4,9 or 16 elements on the screen
        if nblocks==0
            nblocks=3;
        end
        screen=mod(n,10); %remainder
        if screen==5
            flag=1;
            fixation(trial)=0;
            boxes(trial,:)=zeros(1,16);
        end
        if screen==9
            flag=0;
            save_choice(trial)=last_box;
        end
    end
    
    if flag==1
       fixation(trial)=fixation(trial)+1;
       nbox=box(i,nblocks);
       if nbox>0
            boxes(trial,nbox)=boxes(trial,nbox)+1;
            boxes_01(trial,nbox)=1;
            last_box=nbox;
       end
    end
end